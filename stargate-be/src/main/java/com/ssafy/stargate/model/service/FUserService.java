package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.EmailDuplicationException;
import com.ssafy.stargate.exception.LoginException;
import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.exception.RegisterException;
import com.ssafy.stargate.model.dto.common.FUserDto;
import com.ssafy.stargate.model.dto.common.FUserFindIdDto;
import com.ssafy.stargate.model.dto.common.FUserFindPwDto;
import com.ssafy.stargate.model.dto.request.FUserLoginRequestDto;
import com.ssafy.stargate.model.dto.request.FUserUpdateRequestDto;
import com.ssafy.stargate.model.dto.request.UserEmailCheckRequestDto;
import com.ssafy.stargate.model.dto.response.JwtResponseDto;
import com.ssafy.stargate.model.dto.response.UserEmailCheckResponseDto;
import org.springframework.validation.annotation.Validated;
import java.security.Principal;


/**
 * 팬 유저 서비스 인터페이스
 *
 * @author 남현실, 김도현
 */
public interface FUserService {
    public void create(@Validated FUserDto dto) throws EmailDuplicationException, RegisterException;

    public JwtResponseDto login(FUserLoginRequestDto dto) throws NotFoundException, LoginException;

    public FUserDto getFUser(Principal principal) throws NotFoundException;

    public FUserDto updateFUser(FUserUpdateRequestDto fUserDto, Principal principal) throws NotFoundException;

    public void deleteFUser(Principal principal);

    public FUserFindIdDto getFUserId(FUserFindIdDto dto) throws NotFoundException;

    public FUserFindPwDto getCertifyCode(FUserFindPwDto dto) throws NotFoundException;

    public void checkCertify(FUserFindPwDto dto) throws LoginException, NotFoundException;

    public void updateFUserPw(FUserFindPwDto dto) throws NotFoundException;

    public UserEmailCheckResponseDto checkDuplicateEmail(UserEmailCheckRequestDto dto);

    public void logout() throws NotFoundException;
}