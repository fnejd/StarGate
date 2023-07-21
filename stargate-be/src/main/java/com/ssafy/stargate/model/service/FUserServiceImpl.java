package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.EmailDuplicationException;
import com.ssafy.stargate.exception.LoginException;
import com.ssafy.stargate.exception.RegisterException;
import com.ssafy.stargate.model.dto.common.FUserDto;
import com.ssafy.stargate.model.dto.request.FUserLoginRequestDto;
import com.ssafy.stargate.model.dto.request.FUserRegisterRequestDto;
import com.ssafy.stargate.model.dto.response.JwtResponseDto;
import com.ssafy.stargate.model.entity.FUser;
import com.ssafy.stargate.model.repository.FUserRepository;
import com.ssafy.stargate.util.JwtTokenUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.HashMap;
import java.util.Optional;

/**
 * 팬 유저 서비스 구현체
 * @author 남현실
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class FUserServiceImpl implements FUserService {
    @Autowired
    private FUserRepository fUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    /**
     * 팬 유저 회원가입을 진행한다.
     *
     * @param dto [FUserRegisterRequestDto] 유저 회원가입 정보
     * @throws RegisterException 아이디 중복 가입 시 발생하는 에러
     */
    @Transactional
    public void create(FUserRegisterRequestDto dto) throws EmailDuplicationException, RegisterException {
        FUser dbCheck = fUserRepository.findById(dto.getEmail()).orElse(null);
        if (dbCheck != null) {
            throw new EmailDuplicationException("소속사 아이디 중복");
        }

        dto.setPassword(passwordEncoder.encode(dto.getPassword()));

        FUser fuser = FUser.builder()
                .email(dto.getEmail())
                .name(dto.getName())
                .nickname(dto.getNickname())
                .password(dto.getPassword())
                .birthday(dto.getBirthday())
                .build();
        fUserRepository.save(fuser);
    }

    /**
     * 팬 로그인을 진행한다.
     * @param dto [FUserLoginRequestDto] 유저 로그인 정보
     * @return [JwtResponseDto] 새로 생성한 JWT
     * @throws LoginException 로그인 에러
     */
    @Override
    public JwtResponseDto login(FUserLoginRequestDto dto) throws LoginException {
        FUser fUser = fUserRepository.findById(dto.getEmail()).orElseThrow(() -> new LoginException("해당 이메일 없음"));
        if(passwordEncoder.matches(dto.getPassword(), fUser.getPassword())) {
            return JwtResponseDto.builder()
                    .refreshToken(jwtTokenUtil.createRefreshToken(fUser.getEmail(),"USER"))
                    .accessToken(jwtTokenUtil.createAccessToken(fUser.getEmail(),"USER"))
                    .build();
        } else {
            throw new LoginException("팬 로그인 실패");
        }
    }

    /**
     * FUser 의 회원 정보 반환
     * @param principal 유저 email이 포함된 principal 객체
     * @return FUserDto 회원정보 객체
     */
    @Override
    public FUserDto getFUser(Principal principal) throws Exception {
        String email = principal.getName();
        FUser fUser = fUserRepository.findById(email).orElseThrow(() ->new Exception("NO EMAIL"));

        return FUserDto.builder()
                .name(fUser.getName())
                .email(fUser.getEmail())
                .nickname(fUser.getNickname())
                .password(fUser.getPassword())
                .birthday(fUser.getBirthday())
                .build();
    }

    /**
     * FUser 회원 정보 수정
     * @param fUserDto 회원 email 정보가 담긴 FUserDto 객체
     */
    @Override
    public void updateFUser(FUserDto fUserDto) {

        FUser fUser = fUserRepository.findById(fUserDto.getEmail()).orElseThrow();

        fUser.setName(fUser.getName());
        fUser.setPassword(fUser.getPassword());
        fUser.setNickname(fUserDto.getNickname());
        fUser.setBirthday(fUserDto.getBirthday());

        fUserRepository.save(fUser);
    }

    /**
     * FUser 회원 탈퇴
     * @param fUserDto 회원 email 정보가 담긴 FUserDto 객체
     * @param principal 유저 email이 포함된 principal 객체
     */
    @Override
    public void deleteFUser(FUserDto fUserDto, Principal principal) {
        fUserRepository.deleteById(principal.getName());
    }


}


