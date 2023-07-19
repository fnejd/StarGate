package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.LoginException;
import com.ssafy.stargate.exception.RegisterException;
import com.ssafy.stargate.model.dto.JwtResponseDto;
import com.ssafy.stargate.model.dto.request.PUserRequestDto;
import com.ssafy.stargate.model.entity.PUser;
import com.ssafy.stargate.model.repository.PUserRepository;
import com.ssafy.stargate.util.JwtTokenUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * 소속사 유저완 관련된 서비스의 구현체
 *
 * @author 백승윤
 */
@Service
@Slf4j
public class PUserServiceImpl implements PUserService {

    @Autowired
    private PUserRepository pUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    /**
     * 소속사 직원에 대한 회원가입을 수행한다.
     * @param dto : PUserRegisterRequestDto : 소속사 회원가입 정보를 지닌 dto
     * @throws RegisterException 중복가입 발생시 던지는 예외이다.
     */
    @Override
    public void register(PUserRequestDto dto) throws RegisterException {
        PUser dbCheck = pUserRepository.findById(dto.getEmail()).orElse(null);
        if (dbCheck != null) {
            log.error("소속사 회원가입 실패. 가입 데이터 : {}", dto);
            throw new RegisterException();
        }
        PUser pUser = PUser.builder()
                .email(dto.getEmail())
                .code(dto.getCode())
                .password(passwordEncoder.encode(dto.getPassword()))
                .joinDate(LocalDateTime.now())
                .build();
        pUserRepository.save(pUser);
    }

    /**
     * 소속사 회원의 로그인을 수행. 성공시 JWT를 생성 및 반환하도록 한다.
     * @param dto : PUserRequestDto 회원가입 정보가 담긴 dto. email와 password를 사용
     * @return String : 새로 생성한 JWT 를 반환한다.
     */
    @Override
    public JwtResponseDto login(PUserRequestDto dto) throws LoginException{
        PUser pUser = pUserRepository.findById(dto.getEmail()).orElseThrow(() -> new LoginException());
        if(passwordEncoder.matches(dto.getPassword(),pUser.getPassword())){
            return JwtResponseDto.builder()
                    .refreshToken(jwtTokenUtil.createRefreshToken(pUser.getEmail(),"PRODUCER"))
                    .accessToken(jwtTokenUtil.createAccessToken(pUser.getEmail(),"PRODUCER"))
                    .build();
        }else{
            throw new LoginException();
        }
    }
}
