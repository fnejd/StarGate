package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.request.PolaroidRequestDto;
import com.ssafy.stargate.model.dto.response.PolaroidResponseDto;
import com.ssafy.stargate.model.entity.*;
import com.ssafy.stargate.model.repository.*;
import com.ssafy.stargate.util.FileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * 폴라로이드 관련 서비스 구현체
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class PolaroidServiceImpl implements PolaroidService {
    @Autowired
    private final PolaroidRepository polaroidRepository;

    @Autowired
    private final MeetingRepository meetingRepository;

    @Autowired
    private final MeetingMemberRepository meetingMemberRepository;

    @Autowired
    private final MeetingFUserRepository meetingFUserRepository;

    @Autowired
    private final FUserRepository fUserRepository;

    @Autowired
    private final FileUtil fileUtil;

    @Value("polaroid")
    private String filePath;

    /**
     * 저장된 폴라로이드 리스트를 가져온다.
     *
     * @param uuid      [UUID] 미팅 uuid (id)
     * @param principal [Principal] 유저 이메일이 포함된 객체
     * @return [List<PolaroidResponseDto>] 저장된 폴라로이드 정보 dto 리스트
     */
    @Override
    public List<PolaroidResponseDto> getPolaroidList(UUID uuid, Principal principal) {
        String email = principal.getName();

        try {
            Meeting meeting = getMeeting(uuid);

            List<MeetingMemberBridge> meetingMembers = meeting.getMeetingMembers();
            return getPolaroidResponseDtoList(meetingMembers, email, uuid);
        } catch (Exception e) {
            log.warn(e.getMessage());
            return new ArrayList<>();
        }
    }

    /**
     * 폴라로이드 이미지를 저장한다.
     *
     * @param dto       [MeetingDto] 생성할 폴라로이드 정보
     * @param imageFile [MultipartFile] 폴라로이드 이미지 파일
     * @throws CRUDException 폴라로이드 생성 실패
     */
    @Override
    public void createPolaroid(PolaroidRequestDto dto, MultipartFile imageFile) throws CRUDException {
        String filename = fileUtil.uploadFile(filePath, imageFile);
        if (filename == null) {
            throw new CRUDException("이미지 파일이 없어 생성이 불가능합니다.");
        }
        try {
            Meeting meeting = getMeeting(dto.getUuid());
            Polaroid polaroid = Polaroid.builder()
                    .meeting(meeting)
                    .fUser(getFUser(dto.getEmail(), meeting))
                    .pMember(getMember(dto.getMemberNo(), meeting))
                    .image(filename)
                    .build();

            polaroidRepository.save(polaroid);
        } catch (Exception e) {
            fileUtil.deleteFile(filePath, filename);
            throw new CRUDException("폴라로이드 생성 중 오류가 발생했습니다.");
        }
    }

    /**
     * 폴라로이드 엔티티 리스트를 통해 폴라로이드 디테일 response dto 리스트를 만든다.
     *
     * @param polaroids [List<Polaroid> polaroids] 폴라로이드 엔티티 리스트
     * @return [PolaroidResponseDto.PolaroidDetailDto] 폴라로이드 디테일 response dto 리스트
     */
    private List<PolaroidResponseDto.PolaroidDetailDto> polaroidToDetailDtoList(List<Polaroid> polaroids) {
        return polaroids.stream().map(polaroid -> PolaroidResponseDto.PolaroidDetailDto.builder()
                        .no(polaroid.getNo())
                        .imageFileInfo(fileUtil.getFileInfo(filePath, polaroid.getImage()))
                        .build())
                .toList();
    }

    /**
     * 멤버별로 폴라로이드를 찾아가면서 폴라로이드 response dto를 만든다
     * @param meetingMembers [List<MeetingMemberBridge>]
     * @param email [String] 팬 유저 email (id)
     * @param uuid [String] 미팅 uuid
     * @return [List<PolaroidResponseDto>] 폴라로이드 response dto
     */
    private List<PolaroidResponseDto> getPolaroidResponseDtoList(List<MeetingMemberBridge> meetingMembers, String email, UUID uuid) {
        return meetingMembers.stream().map(meetingMember -> {
                    long memberNo = meetingMember.getPMember().getMemberNo();

                    List<Polaroid> polaroids = polaroidRepository.findPolaroidList(email, memberNo, uuid);
                    List<PolaroidResponseDto.PolaroidDetailDto> polaroidDetailDtos = polaroidToDetailDtoList(polaroids);

                    return PolaroidResponseDto.builder()
                            .memberNo(memberNo)
                            .polaroids(polaroidDetailDtos)
                            .build();
                }
        ).toList();
    }

    /**
     * 저장된 미팅을 가져온다.
     *
     * @param uuid [UUID] 미팅 uuid (id)
     * @return [Meeting] 미팅 데이터
     * @throws NotFoundException 데이터 찾기 실패 에러
     */
    private Meeting getMeeting(UUID uuid) throws NotFoundException {
        return meetingRepository.findById(uuid)
                .orElseThrow(() -> new NotFoundException("미팅 존재하지 않음"));
    }

    /**
     * 저장된 팬 유저를 가져온다.
     * 팬 유저는 가입되어있어야 하며 해당 meeting에 참가되어있어야한다.
     *
     * @param email   [String] 팬 유저 이메일 (id)
     * @param meeting [Meeting] 미팅
     * @return [FUser] 팬 유저 데이터
     * @throws NotFoundException 데이터 찾기 실패 에러
     */
    private FUser getFUser(String email, Meeting meeting) throws NotFoundException {
        MeetingFUserBridge meetingFUser = meetingFUserRepository.findByEmailAndUuid(email, meeting.getUuid())
                .orElseThrow(() -> new NotFoundException("미팅 유저 존재하지 않음"));

        return fUserRepository.findById(meetingFUser.getEmail())
                .orElseThrow(() -> new NotFoundException("가입되지 않은 유저임"));
    }

    /**
     * 저장된 멤버를 가져온다.
     * 멤버는 해당 meeting에 참가되어있어야한다.
     *
     * @param memberNo [long] 멤버 번호 (id)
     * @param meeting  [Meeting] 미팅
     * @return [PMember] 멤버 데이터
     * @throws NotFoundException 데이터 찾기 실패 에러
     */
    private PMember getMember(long memberNo, Meeting meeting) throws NotFoundException {
        MeetingMemberBridge meetingMemberBridge = meetingMemberRepository.findByMemberNoAndUuid(memberNo, meeting.getUuid())
                .orElseThrow(() -> new NotFoundException("미팅 멤버 존재하지 않음"));
        return meetingMemberBridge.getPMember();
    }

}