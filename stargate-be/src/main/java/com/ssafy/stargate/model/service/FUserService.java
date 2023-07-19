package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.RegisterException;
import com.ssafy.stargate.model.dto.request.FUserRegisterRequestDto;

/**
 * 팬 유저 서비스 인터페이스
 */
public interface FUserService {
    public void create(FUserRegisterRequestDto dto) throws RegisterException;
}
