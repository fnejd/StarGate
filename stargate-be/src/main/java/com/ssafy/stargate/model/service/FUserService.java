package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.LoginException;
import com.ssafy.stargate.exception.RegisterException;
import com.ssafy.stargate.model.dto.request.FUserLoginRequestDto;
import com.ssafy.stargate.model.dto.request.FUserRegisterRequestDto;
import com.ssafy.stargate.model.dto.response.JwtResponseDto;

/**
 * 팬 유저 서비스 인터페이스
 * @author 남현실
 */
public interface FUserService {
    public void create(FUserRegisterRequestDto dto) throws RegisterException;
    public JwtResponseDto login(FUserLoginRequestDto dto) throws LoginException;
}
