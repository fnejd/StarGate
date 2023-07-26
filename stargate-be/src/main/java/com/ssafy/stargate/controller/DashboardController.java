package com.ssafy.stargate.controller;

import com.ssafy.stargate.model.service.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

/**
 * 팬유저, 소속사 대시보드에 대한 Controller이다
 */
@RestController
@Slf4j
@RequiredArgsConstructor
public class DashboardController {
    @Autowired
    DashboardService dashboardService;

//    @GetMapping("/pusers/dashboard")

//    @GetMapping("/fuser/dashboard")
}
