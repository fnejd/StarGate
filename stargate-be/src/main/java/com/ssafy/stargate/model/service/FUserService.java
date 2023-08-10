package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.EmailDuplicationException;
import com.ssafy.stargate.exception.LoginException;
import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.exception.RegisterException;
import com.ssafy.stargate.model.dto.request.fuser.*;
import com.ssafy.stargate.model.dto.request.fuser.FUserEmailCheckRequestDto;
import com.ssafy.stargate.model.dto.response.jwt.JwtResponseDto;
import com.ssafy.stargate.model.dto.response.fuser.FUserEmailCheckResponseDto;
import com.ssafy.stargate.model.dto.response.fuser.FUserFindIdResponseDto;
import com.ssafy.stargate.model.dto.response.fuser.FUserFindPwResponseDto;
import com.ssafy.stargate.model.dto.response.fuser.FUserResponseDto;
import org.springframework.validation.annotation.Validated;
import java.security.Principal;


/**
 * 팬 유저 서비스 인터페이스
 *
 * @author 남현실, 김도현
 */
public interface FUserService {
    public void create(@Validated FUserCreateRequestDto dto) throws EmailDuplicationException, RegisterException;

    public JwtResponseDto login(FUserLoginRequestDto dto) throws NotFoundException, LoginException;

    public FUserResponseDto getFUser(Principal principal) throws NotFoundException;

    public FUserResponseDto updateFUser(FUserUpdateRequestDto fUserDto, Principal principal) throws NotFoundException;

    public void deleteFUser(Principal principal);

    public FUserFindIdResponseDto getFUserId(FUserFindIdRequestDto dto) throws NotFoundException;

    public FUserFindPwResponseDto getCertifyCode(FUserFindPwRequestDto dto) throws NotFoundException;

    public void checkCertify(FUserCheckCodeRequestDto dto) throws LoginException, NotFoundException;

    public void updateFUserPw(FUserResetPwRequestDto dto) throws NotFoundException;

    public FUserEmailCheckResponseDto checkDuplicateEmail(FUserEmailCheckRequestDto dto);

    public void logout() throws NotFoundException;
}