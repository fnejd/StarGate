package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.EmailDuplicationException;
import com.ssafy.stargate.exception.LoginException;
import com.ssafy.stargate.exception.RegisterException;
import com.ssafy.stargate.model.dto.response.JwtResponseDto;
import com.ssafy.stargate.model.dto.common.PUserDto;

import java.security.Principal;

/**
 * 소속사 유저와 관련된 서비스를 명시하는 인터페이스
 * @author 백승윤
 */
public interface PUserService {
    void register(PUserDto dto) throws EmailDuplicationException, RegisterException;
    JwtResponseDto login(PUserDto dto) throws LoginException;

    void deletePUser(PUserDto dto, Principal principal);

    PUserDto getPUserData(Principal principal);

    int updatePUser(PUserDto pUserDto);

    boolean checkEmailExist(String email);
}
