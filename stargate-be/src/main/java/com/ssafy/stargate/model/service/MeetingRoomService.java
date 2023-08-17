package com.ssafy.stargate.model.service;

import com.ssafy.stargate.model.dto.response.meetingroom.MeetingRoomFUserResponseDto;
import com.ssafy.stargate.model.dto.response.meetingroom.MeetingRoomMemberResponseDto;

import java.security.Principal;
import java.util.UUID;

/**
 * 미팅룸 서비스 인터페이스
 */
public interface MeetingRoomService {
    MeetingRoomFUserResponseDto getFUserMeetingRoomInfo(UUID uuid, Principal principal);

    MeetingRoomMemberResponseDto getMemberMeetingRoomInfo(String roomId);
}
