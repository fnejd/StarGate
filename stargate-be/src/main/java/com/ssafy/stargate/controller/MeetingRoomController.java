package com.ssafy.stargate.controller;


import com.ssafy.stargate.model.dto.response.meetingroom.MeetingRoomFUserResponseDto;
import com.ssafy.stargate.model.dto.response.meetingroom.MeetingRoomMemberResponseDto;
import com.ssafy.stargate.model.service.MeetingRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.UUID;

/**
 * 미팅룸관련 Controller이다.
 */
@RestController
@RequestMapping("/meetingroom")
@RequiredArgsConstructor
public class MeetingRoomController {
    private final MeetingRoomService meetingRoomService;

    @GetMapping("/fuser/get")
    public ResponseEntity<MeetingRoomFUserResponseDto> getFUserMeetingRoomInfo(@RequestParam UUID uuid, Principal principal) {
        MeetingRoomFUserResponseDto meetingRoomFUserResponseDto = meetingRoomService.getFUserMeetingRoomInfo(uuid, principal);
        return ResponseEntity.ok(meetingRoomFUserResponseDto);
    }

    /**
     * 접속한 연예인 화상통화 정보를 보내준다.
     * @param roomId 미팅 번호 UUID
     * @return
     * - 백승윤
     */
    @GetMapping("/member/get")
    public ResponseEntity<MeetingRoomMemberResponseDto> getMemberMeetingRoomInfo(@RequestParam String roomId) {
        MeetingRoomMemberResponseDto meetingRoomMemberResponseDto = meetingRoomService.getMemberMeetingRoomInfo(roomId);
        return ResponseEntity.ok(meetingRoomMemberResponseDto);
    }
}
