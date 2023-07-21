package com.ssafy.stargate.model.service;

//import com.ssafy.stargate.exception.SaveException;
import com.ssafy.stargate.exception.SaveException;
import com.ssafy.stargate.model.dto.common.*;
import com.ssafy.stargate.model.entity.*;
import com.ssafy.stargate.model.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

/**
 * 미팅 관련 서비스 구현체
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class MeetingServiceImplement implements MeetingService {
    @Autowired
    private final MeetingRepository meetingRepository;

    @Autowired
    private final MeetingFUserRepository meetingFUserRepository;

    @Autowired
    private final MeetingMemberRepository meetingMemberRepository;

    @Autowired
    private final PMemberRepository pMemberRepository;

    @Autowired
    private final PUserRepository pUserRepository;

    @Autowired
    private final FUserRepository fUserRepository;

    /**
     * 신규 meeting을 생성한다.
     * @param dto [MeetingDto] 입력받은 meeting dto
     * @param principal [Principal] 소속사 이메일이 포함된 객체
     * @return [MeetingDto] 생성한 미팅 정보를 담은 dto
     */
    @Transactional
    @Override
    public MeetingDto create(MeetingDto dto, Principal principal) throws SaveException {
        String email = principal.getName();
        log.info("data : {}", dto);

        try {
            Meeting meeting = Meeting.builder()
                    .name(dto.getName())
                    .startDate(dto.getStartDate())
                    .waitingTime(dto.getWaitingTime())
                    .meetingTime(dto.getMeetingTime())
                    .notice(dto.getNotice())
                    .pUser(pUserRepository.findById(email).get())
                    .build();

            meetingRepository.save(meeting);

            List<MeetingMemberBridge> meetingMembers = meetingMemberRepository.saveAll(dto.getMeetingMembers().stream().map(meetingMemberBridgeDto -> MeetingMemberBridge.builder()
                    .meeting(meeting)
                    .pMember(pMemberRepository.findById(meetingMemberBridgeDto.getMemberNo()).get())
                    .orderNum(meetingMemberBridgeDto.getOrderNum())
                    .build()).toList());

            List<MeetingFUserBridge> meetingFUsers = meetingFUserRepository.saveAll(dto.getMeetingFUsers().stream().map(meetingFUserBridgeDto -> MeetingFUserBridge.builder()
                    .meeting(meeting)
                    .fUser(fUserRepository.findById(meetingFUserBridgeDto.getEmail()).get())
                    .orderNum(meetingFUserBridgeDto.getOrderNum())
                    .build()).toList());

            return MeetingDto.builder()
                    .uuid(meeting.getUuid())
                    .name(meeting.getName())
                    .startDate(meeting.getStartDate())
                    .waitingTime(meeting.getWaitingTime())
                    .meetingTime(meeting.getMeetingTime())
                    .notice(meeting.getNotice())
                    .meetingMembers(meetingMembers.stream()
                            .map(meetingMember -> MeetingMemberBridgeDto.builder()
                                    .no(meetingMember.getNo())
                                    .memberNo(meetingMember.getPMember().getMemberNo())
                                    .orderNum(meetingMember.getOrderNum())
                                    .build()).toList())
                    .meetingFUsers(meetingFUsers.stream()
                            .map(meetingFUser -> MeetingFUserBridgeDto.builder()
                                    .no(meetingFUser.getNo())
                                    .email(meetingFUser.getFUser().getEmail())
                                    .orderNum(meetingFUser.getOrderNum())
                                    .build()).toList())
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
            throw new SaveException("미팅 생성 도중 오류가 발생했습니다.");
        }
    }

}
