package com.ssafy.stargate.controller;

import com.ssafy.stargate.exception.SaveException;
import com.ssafy.stargate.model.dto.common.MeetingDto;
import com.ssafy.stargate.model.service.MeetingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

/**
 * 미팅 관리를 수행하는 컨트롤러
 */
@RequestMapping("/meetings")
@RestController
@RequiredArgsConstructor
@Slf4j
public class MeetingController {
    @Autowired
    private final MeetingService meetingService;

    /**
     * 신규 미팅을 생성한다.
     * @param dto [MeetingDto] 생성할 신규 미팅 정보
     * @param principal [Principal] 소속사 이메일이 포함된 객체
     * @return 저장된 미팅 결과 dto (성공: 201)
     * @throws SaveException
     */
    @PostMapping("/create")
    public ResponseEntity<?> createMeeting(@ModelAttribute MeetingDto dto, Principal principal) throws SaveException {
        System.out.println(dto);
        MeetingDto meeting = meetingService.create(dto, principal);
        return ResponseEntity.status(201).body(meeting);
    }
}
