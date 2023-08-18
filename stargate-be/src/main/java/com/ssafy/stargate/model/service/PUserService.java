package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.EmailDuplicationException;
import com.ssafy.stargate.exception.LoginException;
import com.ssafy.stargate.exception.RegisterException;
import com.ssafy.stargate.model.dto.request.puser.PUserCreateRequestDto;
import com.ssafy.stargate.model.dto.request.puser.PUserDeleteRequestDto;
import com.ssafy.stargate.model.dto.request.puser.PUserLoginRequestDto;
import com.ssafy.stargate.model.dto.request.puser.PUserUpdateRequestDto;
import com.ssafy.stargate.model.dto.response.jwt.JwtResponseDto;
import com.ssafy.stargate.model.dto.response.puser.PUserResponseDto;

import java.security.Principal;

/**
 * 소속사 유저와 관련된 서비스를 명시하는 인터페이스
 * @author 백승윤
 */
public interface PUserService {
    void register(PUserCreateRequestDto dto) throws EmailDuplicationException, RegisterException;
    JwtResponseDto login(PUserLoginRequestDto dto) throws LoginException;

    void deletePUser(PUserDeleteRequestDto dto, Principal principal);

    PUserResponseDto getPUserData(Principal principal);

    int updatePUser(PUserUpdateRequestDto pUserDto);

    boolean checkEmailExist(String email);

    void logout(String name);
}
