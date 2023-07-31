package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.response.DashboardResponseDto;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

/**
 * 대시보드 서비스 인터페이스
 */
public interface DashboardService {

    public DashboardResponseDto getDashBoard() throws NotFoundException;
}
