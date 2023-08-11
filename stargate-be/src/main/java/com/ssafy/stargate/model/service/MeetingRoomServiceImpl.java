package com.ssafy.stargate.model.service;

import com.ssafy.stargate.model.dto.response.meetingroom.MeetingRoomFUserResponseDto;
import com.ssafy.stargate.model.dto.response.meetingroom.MeetingRoomMemberResponseDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.UUID;

/**
 * 미팅룸 서비스 구현체
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class MeetingRoomServiceImpl implements MeetingRoomService{

    @Override
    public MeetingRoomFUserResponseDto getFUserMeetingRoomInfo(UUID uuid, Principal principal) {
        return null;
    }

    @Override
    public MeetingRoomMemberResponseDto getMemberMeetingRoomInfo(String roomId) {
        return null;
    }
}
