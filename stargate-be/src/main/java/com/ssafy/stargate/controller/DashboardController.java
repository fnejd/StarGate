package com.ssafy.stargate.controller;

import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.response.dashboard.DashboardResponseDto;
import com.ssafy.stargate.model.service.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 팬유저, 소속사 대시보드에 대한 Controller이다
 */
@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@Slf4j
public class DashboardController {

    private final DashboardService dashboardService;

    /**
     * 대시보드 정보 전달
     * @return [ResponseEntity<DashboardResponseDto>] today, past, future 미팅 정보 저장하는 dto
     * @throws NotFoundException 토큰에서 해당하는 AUTH 가 USER, PRODUCER 가 아닐 경우
     */
    @GetMapping
    public ResponseEntity<DashboardResponseDto> getDashBoard() throws NotFoundException {

        return ResponseEntity.ok(dashboardService.getDashBoard());
    }
}
