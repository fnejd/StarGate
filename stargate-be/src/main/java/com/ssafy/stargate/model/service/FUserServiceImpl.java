package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.RegisterException;
import com.ssafy.stargate.model.dto.request.FUserRegisterRequestDto;
import com.ssafy.stargate.model.entity.FUser;
import com.ssafy.stargate.model.repository.FUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * 팬 유저 서비스 구현체
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class FUserServiceImpl implements FUserService{
    @Autowired
    private FUserRepository fUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * 팬 유저 회원가입을 진행한다.
     * @param dto [FUserRegisterRequestDto] 유저 회원가입 정보
     * @throws RegisterException 아이디 중복 가입 시 발생하는 에러
     */
    @Transactional
    public void create(FUserRegisterRequestDto dto) throws RegisterException {
        FUser dbCheck = fUserRepository.findById(dto.getEmail()).orElse(null);
        if (dbCheck != null) {
            log.error("회원 회원가입 실패. 가입 데이터 : {}", dto);
            throw new RegisterException();
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
}
