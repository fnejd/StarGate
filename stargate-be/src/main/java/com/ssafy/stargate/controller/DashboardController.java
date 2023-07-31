package com.ssafy.stargate.controller;

import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.response.DashboardResponseDto;
import com.ssafy.stargate.model.service.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 팬유저, 소속사 대시보드에 대한 Controller이다
 */
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/dashboard")
public class DashboardController {
    @Autowired
    DashboardService dashboardService;

    /**
     * 대시보드 정보 전달
     * @return [ResponseEntity<DashboardResponseDto>] today, past, future 미팅 정보 저장하는 dto
     * @throws NotFoundException
     */
    @GetMapping
    public ResponseEntity<DashboardResponseDto> getDashBoard() throws NotFoundException{

        return ResponseEntity.ok(dashboardService.getDashBoard());
    }
}
