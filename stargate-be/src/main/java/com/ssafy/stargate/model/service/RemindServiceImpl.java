package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.response.remind.RemindResponseDto;
import com.ssafy.stargate.model.entity.*;
import com.ssafy.stargate.model.repository.LetterRepository;
import com.ssafy.stargate.model.repository.MeetingRepository;
import com.ssafy.stargate.model.repository.PolaroidRepository;
import com.ssafy.stargate.util.FileUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


/**
 * 팬유저 팬미팅 리마인드 관련 서비스 구현체
 */
@Service
@Slf4j
public class RemindServiceImpl implements RemindService {

    private final FileUtil fileUtil;

    private final String polaroidFilePath;

    private final PolaroidRepository polaroidRepository;

    private final MeetingRepository meetingRepository;

    private final LetterRepository letterRepository;

    public RemindServiceImpl(
            FileUtil fileUtil,
            @Value("${s3.filepath.polaroid}") String polaroidFilePath,
            PolaroidRepository polaroidRepository,
            MeetingRepository meetingRepository,
            LetterRepository letterRepository
    ) {
        this.fileUtil = fileUtil;
        this.polaroidFilePath = polaroidFilePath;
        this.polaroidRepository = polaroidRepository;
        this.meetingRepository = meetingRepository;
        this.letterRepository = letterRepository;
    }

    /**
     * 해당 팬미팅의 리마인드 정보를 가져온다.
     *
     * @param uuid      [UUID] 미팅 uuid
     * @param principal [Principal] 유저 email이 담긴 객체
     * @return [ResponseEntity<RemindResponseDto>] 리마인드 정보를 담은 dto
     */
    @Override
    public RemindResponseDto getRemind(UUID uuid, Principal principal) {
        String email = principal.getName();
        Meeting meeting = getMeeting(uuid);

        PGroup group = getGroup(meeting);
        List<MeetingMemberBridge> meetingMembers = meeting.getMeetingMembers();
        List<RemindResponseDto.MeetingMemberDto> meetingMemberDtos = getMeetingMemberList(meetingMembers, email, uuid);
        return RemindResponseDto.builder()
                .uuid(uuid)
                .name(meeting.getName())
                .startDate(meeting.getStartDate())
                .groupNo(group.getGroupNo())
                .groupName(group.getName())
                .meetingMembers(meetingMemberDtos)
                .build();
    }


    /**
     * 미팅 정보를 가져온다.
     * 미팅 팬유저, 멤버의 orderNum을 이용해 각각 오름차순으로 정렬한다.
     *
     * @param uuid [UUID] 미팅 uuid (id)
     * @return [Meeting] 미팅 데이터
     * @throws NotFoundException 데이터 찾기 실패 에러
     */
    private Meeting getMeeting(UUID uuid) throws NotFoundException {
        Meeting meeting = meetingRepository.findById(uuid)
                .orElseThrow(() -> new NotFoundException("미팅 존재하지 않음"));
        Meeting.sortMeetingByOrderNum(meeting);
        return meeting;
    }

    /**
     * 그룹 정보를 가져온다.
     *
     * @param meeting [Meeting] 미팅
     * @return [PGroup] 그룹 정보
     */
    private PGroup getGroup(Meeting meeting) {
        if (meeting.getMeetingMembers().size() < 1) {
            return null;
        }
        MeetingMemberBridge meetingMember = meeting.getMeetingMembers().get(0);
        return meetingMember.getPMember().getPGroup();
    }

    /**
     * 멤버별로 폴라로이드와 편지를 찾아가면서 리마인드 미팅 멤버 dto 리스트를 만든다
     *
     * @param meetingMembers [List<MeetingMemberBridge>]
     * @param email          [String] 팬 유저 email (id)
     * @param uuid           [String] 미팅 uuid
     * @return [List<RemindResponseDto.MeetingMemberDto>] 리마인드 미팅 멤버 dto 리스트
     */
    private List<RemindResponseDto.MeetingMemberDto> getMeetingMemberList(List<MeetingMemberBridge> meetingMembers, String email, UUID uuid) {
        return meetingMembers.stream().map(meetingMember -> {
                    long memberNo = meetingMember.getPMember().getMemberNo();

                    Optional<List<Polaroid>> polaroids = polaroidRepository.findPolaroidList(email, memberNo, uuid);
                    List<RemindResponseDto.PolaroidDto> polaroidDtos = (polaroids.isPresent())? getPolaroidList(polaroids.get()) : new ArrayList<>();

                    Optional<Letter> letter = letterRepository.findLetter(email, memberNo, uuid);
                    RemindResponseDto.LetterDto letterDto = (letter.isPresent())? getLetter(letter.get()) : null;

                    return RemindResponseDto.MeetingMemberDto.builder()
                            .memberNo(memberNo)
                            .name(meetingMember.getPMember().getName())
                            .polaroids(polaroidDtos)
                            .letter(letterDto)
                            .build();
                }
        ).toList();
    }

    /**
     * 폴라로이드 엔티티 리스트를 통해 폴라로이드 response dto 리스트를 만든다.
     *
     * @param polaroids [List<Polaroid> polaroids] 폴라로이드 엔티티 리스트
     * @return [RemindResponseDto.PolaroidDto] 폴라로이드 response dto 리스트
     */
    private List<RemindResponseDto.PolaroidDto> getPolaroidList(List<Polaroid> polaroids) {
        return polaroids.stream().map(polaroid -> RemindResponseDto.PolaroidDto.builder()
                        .no(polaroid.getNo())
                        .imageFileInfo(fileUtil.getFileInfo(polaroidFilePath, polaroid.getImage()))
                        .build())
                .toList();
    }

    /**
     * 팬레터 엔티티 리스트를 통해 팬레터 response dto를 만든다.
     *
     * @param letter [Letter] 팬레터 엔티티
     * @return [RemindResponseDto.LetterDto] 팬레터 response dto
     */
    private RemindResponseDto.LetterDto getLetter(Letter letter) {
        return RemindResponseDto.LetterDto.builder()
                .no(letter.getNo())
                .contents(letter.getContents())
                .createDate(letter.getCreateDate())
                .editDate(letter.getEditDate())
                .build();
    }
}
