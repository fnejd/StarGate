package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.response.meetingroom.MeetingRoomFUserResponseDto;
import com.ssafy.stargate.model.dto.response.meetingroom.MeetingRoomMemberResponseDto;
import com.ssafy.stargate.model.entity.*;
import com.ssafy.stargate.model.repository.*;
import com.ssafy.stargate.model.repository.MeetingRepository;
import com.ssafy.stargate.model.repository.MemoRepository;
import com.ssafy.stargate.model.repository.PolaroidEnableRepository;
import com.ssafy.stargate.model.repository.PostitRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;
import java.util.StringTokenizer;
import java.util.UUID;

/**
 * 미팅룸 서비스 구현체
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class MeetingRoomServiceImpl implements MeetingRoomService {

    private final MeetingRepository meetingRepository;
    private final FUserRepository fUserRepository;
    private final PolaroidEnableRepository polaroidEnableRepository;
    private final MeetingMemberRepository meetingMemberRepository;
    private final PostitRepository postitRepository;
    private final MemoRepository memoRepository;

    @Override
    public MeetingRoomFUserResponseDto getFUserMeetingRoomInfo(UUID uuid, Principal principal) throws NotFoundException {
        String email = principal.getName();
        Meeting meeting = getMeeting(uuid);

        if (meeting.getMeetingMembers().size() < 1) throw new NotFoundException("미팅멤버가 없습니다.");
        return MeetingRoomFUserResponseDto.builder()
                .email(email) // fuser
                .waitingTime(meeting.getWaitingTime())
                .meetingTime(meeting.getMeetingTime())
                .photoNum(meeting.getPhotoNum())
                .memoContents(memoRepository.findById(Memo.createId(uuid, email))
                        .orElse(Memo.builder().contents(null).build())
                        .getContents())
                .meetingMembers(getMeetingMemberDtoList(meeting, email))
                .build();
    }

    /**
     * 연예인이 방 입장시 필요한 모든 정보를 일괄 로딩하여 배치한다.
     *
     * @param roomId 연예인 대기방 고유번호
     * @return 연예인과 관련된 모든 팬들의 정보를 담는 객체
     */
    @Override
    @Transactional(readOnly = true)
    public MeetingRoomMemberResponseDto getMemberMeetingRoomInfo(String roomId) {
        StringTokenizer stk = new StringTokenizer(roomId, ".");
        UUID meetingUuid = UUID.fromString(stk.nextToken());
        UUID meetingMemberBridgeUuid = UUID.fromString(stk.nextToken());
        long memberNo = meetingMemberRepository.getMemberNoById(meetingMemberBridgeUuid);
        log.info("MEETING UUID = {}, meetingMemberBridgeUuid = {}, memberNo = {}", meetingUuid, meetingMemberBridgeUuid,memberNo);
        Meeting meeting = meetingRepository.findById(meetingUuid).orElseThrow();
        List<String> fUserList = meetingRepository.getFUserListByMeetingId(meetingUuid);
        log.info("FUSER LIST = {}", fUserList);
        List<FUser> fUserEntityList = fUserRepository.findAllById(fUserList);
        List<MeetingRoomMemberResponseDto.InnerMeetingFUser> innerMeetingFUserList =
                fUserEntityList.stream().map(fUser -> MeetingRoomMemberResponseDto.InnerMeetingFUser
                        .builder()
                        .email(fUser.getEmail())
                        .name(fUser.getName())
                        .nickname(fUser.getNickname())
                        .birthday(fUser.getBirthday())
                        .polaroidEnable(Boolean.parseBoolean(
                                        polaroidEnableRepository.findById(
                                                PolaroidEnable.createId(meetingUuid, fUser.getEmail(), memberNo)).orElse(PolaroidEnable.builder()
                                                .isPolaroidEnable("false").build()
                                        ).getIsPolaroidEnable()
                                )
                        )
                        .postitContent(postitRepository.findPostit(fUser.getEmail(),memberNo,meetingUuid).orElse(Postit.builder().contents("등록된 포스트잇이 없습니다.").build()).getContents())
                        .totalMeetingCnt(meetingRepository.countByEmailAndMemberNo(fUser.getEmail(),memberNo))
                        .build()).toList();
        MeetingRoomMemberResponseDto result = MeetingRoomMemberResponseDto.builder()
                .waitingTime(meeting.getWaitingTime())
                .meetingTime(meeting.getMeetingTime())
                .photoNum(meeting.getPhotoNum())
                .memberNo(memberNo)
                .meetingFUsers(innerMeetingFUserList)
                .build();
        log.info("meeting member response dto = {}", result);
        return result;

        // 팬유저정보
        // 폴라로이드 가용 여부 -> redis
        // 포스트잇 내용
        // 총 팬미팅 횟수
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
     * 팬유저 미팅방의 미팅 멤버 정보 리스트를 가져온다.
     *
     * @param meeting [Meeting] 미팅방의 미팅 엔티티
     * @param email   [String] 팬유저 이메일
     * @return [List<MeetingRoomFUserResponseDto.MeetingMember>] 미팅방 미팅 멤버 정보를 담은 dto 리스트
     */
    private List<MeetingRoomFUserResponseDto.MeetingMember> getMeetingMemberDtoList(Meeting meeting, String email) {
        return meeting.getMeetingMembers().stream().map(meetingMember -> {
            PMember member = meetingMember.getPMember();
            UUID uuid = meeting.getUuid();
            long memberNo = member.getMemberNo();

            return MeetingRoomFUserResponseDto.MeetingMember.builder()
                    .memberNo(member.getMemberNo())
                    .name(member.getName())
                    .roomId(MeetingMemberBridge.getRoomId(meeting, meetingMember))
                    .isPolaroidEnable(Boolean.valueOf(polaroidEnableRepository.findById(PolaroidEnable.createId(uuid, email, memberNo))
                            .orElse(PolaroidEnable.builder().isPolaroidEnable("false").build())
                            .getIsPolaroidEnable()))
                    .postitContents(postitRepository.findPostit(email, memberNo, uuid)
                            .orElse(Postit.builder().contents(null).build())
                            .getContents())
                    .build();
        }).toList();
    }

}
