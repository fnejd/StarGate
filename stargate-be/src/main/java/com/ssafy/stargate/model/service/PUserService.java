package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.LoginException;
import com.ssafy.stargate.exception.RegisterException;
import com.ssafy.stargate.model.dto.response.JwtResponseDto;
import com.ssafy.stargate.model.dto.request.PUserRequestDto;

/**
 * 소속사 유저와 관련된 서비스를 명시하는 인터페이스
 * @author 백승윤
 */
public interface PUserService {
    void register(PUserRequestDto dto) throws RegisterException;
    JwtResponseDto login(PUserRequestDto dto) throws LoginException;
}
