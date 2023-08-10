package com.ssafy.stargate.controller;

import com.ssafy.stargate.model.dto.response.remind.RemindResponseDto;
import com.ssafy.stargate.model.service.RemindService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.UUID;

/**
 * 팬유저 팬미팅 리마인드 관련 Controller 이다.
 */
@RestController
@RequestMapping("/reminds")
@RequiredArgsConstructor
public class RemindController {
    private final RemindService remindService;

    /**
     * 해당 팬미팅의 리마인드 정보를 가져온다.
     *
     * @param uuid      [UUID] 미팅 uuid
     * @param principal [Principal] 유저 email이 담긴 객체
     * @return [ResponseEntity<RemindResponseDto>] 리마인드 정보를 담은 dto
     */
    @GetMapping("/{uuid}")
    public ResponseEntity<RemindResponseDto> getRemind(@PathVariable UUID uuid, Principal principal) {
        RemindResponseDto remindResponseDto = remindService.getRemind(uuid, principal);
        return ResponseEntity.ok(remindResponseDto);
    }
}
