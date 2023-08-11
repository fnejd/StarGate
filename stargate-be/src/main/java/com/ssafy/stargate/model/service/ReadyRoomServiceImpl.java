package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.request.readyroom.MemoWriteRequestDto;
import com.ssafy.stargate.model.dto.request.readyroom.PolaroidEnableWriteRequsetDto;
import com.ssafy.stargate.model.dto.response.file.SavedFileResponseDto;
import com.ssafy.stargate.model.dto.response.readyroom.ReadyRoomResponseDto;
import com.ssafy.stargate.model.entity.*;
import com.ssafy.stargate.model.repository.*;
import com.ssafy.stargate.util.FileUtil;
import com.ssafy.stargate.util.TimeUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * 팬유저 대기방에 관련된 서비스의 구현체
 */
@Service
@Slf4j
public class ReadyRoomServiceImpl implements ReadyRoomService {

    private final MemoRepository memoRepository;


    private final MeetingRepository meetingRepository;


    private final MeetingFUserRepository meetingFUserRepository;


    private final FUserRepository fUserRepository;


    private final PolaroidEnableRepository polaroidEnableRepository;


    private final MeetingMemberRepository meetingMemberRepository;


    private final PostitRepository postitRepository;


    private final FileUtil fileUtil;


    private final String filePath;

    private final TimeUtil timeUtil;

    public ReadyRoomServiceImpl(
            MemoRepository memoRepository,
            MeetingRepository meetingRepository,
            MeetingFUserRepository meetingFUserRepository,
            FUserRepository fUserRepository,
            PolaroidEnableRepository polaroidEnableRepository,
            MeetingMemberRepository meetingMemberRepository,
            PostitRepository postitRepository,
            FileUtil fileUtil,
            @Value("${s3.filepath.meeting}") String filePath,
            TimeUtil timeUtil) {
        this.memoRepository = memoRepository;
        this.meetingRepository = meetingRepository;
        this.meetingFUserRepository = meetingFUserRepository;
        this.fUserRepository = fUserRepository;
        this.polaroidEnableRepository = polaroidEnableRepository;
        this.meetingMemberRepository = meetingMemberRepository;
        this.postitRepository = postitRepository;
        this.fileUtil = fileUtil;
        this.filePath = filePath;
        this.timeUtil = timeUtil;
    }

    /**
     * 팬유저가 참가한 해당 미팅 대기방 정보를 가져온다.
     *
     * @param uuid      [UUID] 미팅 UUID
     * @param principal [Principal] 팬유저 이메일이 포함된 객체
     * @return [ReadyRoomResponseDto] 대기방 정보를 담은 dto
     * @throws NotFoundException 데이터 찾기 실패 에러
     */
    @Override
    public ReadyRoomResponseDto getReadyRoomInfo(UUID uuid, Principal principal) throws NotFoundException {
        String email = principal.getName();
        Meeting meeting = getMeeting(uuid);
        if (meeting.getMeetingMembers().size() < 1) new NotFoundException("미팅멤버가 없습니다.");
        PGroup pGroup = meeting.getMeetingMembers().get(0).getPMember().getPGroup();

        SavedFileResponseDto imageFileInfoDto = (meeting.getImage() != null) ? fileUtil.getFileInfo(filePath, meeting.getImage()) : null;

        return ReadyRoomResponseDto.builder()
                .uuid(meeting.getUuid())
                .name(meeting.getName())
                .startDate(meeting.getStartDate())
                .waitingTime(meeting.getWaitingTime())
                .meetingTime(meeting.getMeetingTime())
                .photoNum(meeting.getPhotoNum())
                .notice(meeting.getNotice())
                .groupNo(pGroup.getGroupNo())
                .groupName(pGroup.getName())
                .imageFileInfo(imageFileInfoDto)
                .meetingFUser(getMeetingFUserDto(meeting, email))
                .meetingMembers(getMeetingMemberDtoList(meeting, email))
                .build();
    }

    /**
     * 팬유저가 작성한 메모를 저장한다.
     * 메모는 한 미팅과 한 유저 당 하나씩 생성된다.
     * 데이터를 Redis에 저장한다.
     *
     * @param dto       [MemoWriteRequestDto] 메모 정보가 담긴 dto
     * @param principal [Principal] 팬유저 이메일이 포함된 객체
     * @throws NotFoundException 데이터 CRUD 에러
     * @throws CRUDException     데이터 찾기 실패 에러
     */
    @Override
    public void writeMemo(MemoWriteRequestDto dto, Principal principal) throws NotFoundException, CRUDException {
        String email = principal.getName();
        UUID uuid = dto.getUuid();
        meetingFUserRepository.findByEmailAndUuid(email, uuid).orElseThrow(() -> new NotFoundException("미팅 팬유저를 찾을 수 없습니다."));

        try {
            String id = Memo.createId(uuid, email);
            Optional<Memo> optionalMemo = memoRepository.findById(id);
            if (!optionalMemo.isPresent()) {
                createMemo(id, dto);
            } else {
                updateMemo(optionalMemo.get(), dto);
            }

        } catch (Exception e) {
            log.warn(e.getMessage());
            throw new CRUDException("메모 작성 중 오류가 발생했습니다.");
        }
    }

    /**
     * 멤버별 폴라로이드 활성화 여부를 작성한다.
     * 데이터를 Redis에 저장한다.
     *
     * @param dto       [PolaroidEnableWriteRequsetDto] 멤버별 폴라로이드 활성화 여부 정보가 담긴 dto
     * @param principal [Principal] 팬유저 이메일이 포함된 객체
     * @throws NotFoundException 데이터 CRUD 에러
     * @throws CRUDException     데이터 찾기 실패 에러
     */
    @Override
    public void writePolaroidEnable(PolaroidEnableWriteRequsetDto dto, Principal principal) throws NotFoundException, CRUDException {
        String email = principal.getName();
        UUID uuid = dto.getUuid();
        meetingFUserRepository.findByEmailAndUuid(email, uuid).orElseThrow(() -> new NotFoundException("미팅 팬유저를 찾을 수 없습니다."));

        try {
            for (PolaroidEnableWriteRequsetDto.MeetingMemberDto meetingMemberDto : dto.getMeetingMembers()) {

                long memberNo = meetingMemberDto.getMemberNo();
                if (!meetingMemberRepository.findByMemberNoAndUuid(memberNo, uuid).isPresent()) {
                    log.warn("해당 미팅 멤버가 없습니다. memberNo: {}", memberNo);
                    continue;
                }

                String id = PolaroidEnable.createId(uuid, email, memberNo);
                Optional<PolaroidEnable> optionalPolaroidEnable = polaroidEnableRepository.findById(id);
                if (!optionalPolaroidEnable.isPresent()) {
                    createPolaroidEnable(id, meetingMemberDto);
                } else {
                    updatePolaroidEnable(optionalPolaroidEnable.get(), meetingMemberDto);
                }
            }

        } catch (Exception e) {
            log.warn(e.getMessage());
            throw new CRUDException("폴라로이드 촬영 활성화 여부 작성 중 오류가 발생했습니다.");
        }

    }


    /**
     * 대기방의 미팅 멤버 정보 리스트를 가져온다.
     *
     * @param meeting [Meeting] 대기방의 미팅 엔티티
     * @param email   [String] 팬유저 이메일
     * @return [List<ReadyRoomResponseDto.MeetingMember>] 대기방 미팅 멤버 정보를 담은 dto 리스트
     */
    private List<ReadyRoomResponseDto.MeetingMember> getMeetingMemberDtoList(Meeting meeting, String email) {
        return meeting.getMeetingMembers().stream().map(meetingMember -> {
            PMember member = meetingMember.getPMember();
            UUID uuid = meeting.getUuid();
            long memberNo = member.getMemberNo();

            ReadyRoomResponseDto.MeetingMember.MeetingMemberBuilder meetingMemberBuilder = ReadyRoomResponseDto.MeetingMember.builder();

            meetingMemberBuilder
                    .memberNo(member.getMemberNo())
                    .name(member.getName())
                    .orderNum(meetingMember.getOrderNum())
                    .roomId(MeetingMemberBridge.getRoomId(meeting, meetingMember))
                    .isPolaroidEnable(Boolean.valueOf(polaroidEnableRepository.findById(PolaroidEnable.createId(uuid, email, memberNo))
                            .orElse(PolaroidEnable.builder().isPolaroidEnable("false").build())
                            .getIsPolaroidEnable()));

            Postit postit = postitRepository.findPostit(email, memberNo, uuid).orElse(null);
            if (postit != null) {
                meetingMemberBuilder
                        .postitContents(postit.getContents());
            }

            return meetingMemberBuilder.build();
        }).toList();
    }

    /**
     * 대기방의 팬유저 정보를 가져온다.
     *
     * @param meeting [Meeting] 대기방의 미팅 엔티티
     * @param email   [String] 팬유저 이메일
     * @return [ReadyRoomResponseDto.MeetingFUser] 대기방 팬유저 정보를 담은 dto
     */
    private ReadyRoomResponseDto.MeetingFUser getMeetingFUserDto(Meeting meeting, String email) throws NotFoundException {
        UUID uuid = meeting.getUuid();
        MeetingFUserBridge meetingFUser = meetingFUserRepository.findByEmailAndUuid(email, uuid).orElseThrow(() -> new NotFoundException("미팅 팬유저를 찾을 수 없습니다."));

        FUser fUser = fUserRepository.findById(meetingFUser.getEmail()).orElseThrow(() -> new NotFoundException("팬유저를 찾을 수 없습니다."));
        Memo memo = memoRepository.findById(Memo.createId(uuid, email)).orElse(null);
        int remainingFanNum = meetingFUserRepository.countRegisteredFUsersLessThanOrderNum(uuid, meetingFUser.getOrderNum());

        return ReadyRoomResponseDto.MeetingFUser.builder()
                .email(fUser.getEmail())
                .orderNum(meetingFUser.getOrderNum())
                .name(fUser.getName())
                .remainingFanNum(remainingFanNum)
                .remainingTime(getFUserRemainSeconds(meeting, remainingFanNum))
                .memoContents((memo != null) ? memo.getContents() : null)
                .build();
    }

    /**
     * 해당 팬유저의 미팅방 시작까지 남은 시간(초)을 구해준다.
     * = (미팅 시작 시간 - 현재 시간) + (한 멤버당 미팅+대기 간격) * (해당 팬유저 앞에 있는 팬유저들(회원가입 완료된) 개수)
     *
     * @param meeting         [Meeting] 대기방의 미팅 엔티티
     * @param remainingFanNum [int] 해당 팬유저 앞에 있는 팬유저들(회원가입 완료된) 개수
     * @return [long] 해당 팬유저의 미팅방 시작까지 남은 시간(초)
     */
    private long getFUserRemainSeconds(Meeting meeting, int remainingFanNum) {
        return timeUtil.getRemainingSeconds(meeting.getStartDate())
                + remainingFanNum * (meeting.getMeetingTime() + meeting.getWaitingTime());
    }

    /**
     * 메모 정보를 저장한다.
     *
     * @param id  [String] 데이터 id
     * @param dto [MemoDto] 메모 정보를 담은 dto
     */
    private void createMemo(String id, MemoWriteRequestDto dto) {
        Memo memo = Memo.builder()
                .id(id)
                .contents(dto.getContents())
                .build();
        memoRepository.save(memo);
    }

    /**
     * 메모 정보를 수정한다.
     *
     * @param memo [Memo] 저장된 메모 엔티티
     * @param dto  [MemoDto] 메모 정보를 담은 dto
     */
    private void updateMemo(Memo memo, MemoWriteRequestDto dto) {
        memo.setContents(dto.getContents());
        memoRepository.save(memo);
    }

    /**
     * 멤버별 폴라로이드 활성화 여부 정보를 저장한다.
     *
     * @param id  [String] 데이터 id
     * @param dto [PolaroidEnableDto.MeetingMemberDto] 해당 멤버의 폴라로이드 활성화 여부 정보를 담은 dto
     */
    private void createPolaroidEnable(String id, PolaroidEnableWriteRequsetDto.MeetingMemberDto dto) {
        PolaroidEnable polaroidEnable = PolaroidEnable.builder()
                .id(id)
                .isPolaroidEnable(String.valueOf(dto.getIsPolaroidEnable()))
                .build();
        polaroidEnableRepository.save(polaroidEnable);
    }

    /**
     * 멤버별 폴라로이드 활성화 여부를 수정한다.
     *
     * @param polaroidEnable [PolaroidEnable] 저장된 폴라로이드 활성화 여부 엔티티
     * @param dto            [PolaroidEnableDto.MeetingMemberDto] 해당 멤버의 폴라로이드 활성화 여부 정보를 담은 dto
     */
    private void updatePolaroidEnable(PolaroidEnable polaroidEnable, PolaroidEnableWriteRequsetDto.MeetingMemberDto dto) {
        polaroidEnable.setIsPolaroidEnable(String.valueOf(dto.getIsPolaroidEnable()));
        polaroidEnableRepository.save(polaroidEnable);
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
}
