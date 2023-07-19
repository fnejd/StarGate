package com.ssafy.stargate.controller;

import com.ssafy.stargate.exception.LoginException;
import com.ssafy.stargate.exception.RegisterException;
import com.ssafy.stargate.model.dto.JwtResponseDto;
import com.ssafy.stargate.model.dto.PUserRequestDto;
import com.ssafy.stargate.model.dto.SimpleDto;
import com.ssafy.stargate.model.service.PUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/pusers")
@RestController
@Slf4j
public class PUserController {

    @Autowired
    PUserService pUserService;

    /**
     * 소속사 유저의 회원가입을 수행한다.
     *
     * @param dto PUserRegisterDto : 소속사 회원가입 정보를 담는다.
     * @return 성공시 200, 실패시 600
     */
    @PostMapping("/register")
    public ResponseEntity<?> createPUser(@ModelAttribute PUserRequestDto dto) {
        try {
            pUserService.register(dto);
            return ResponseEntity.ok(null);
        } catch (RegisterException e) {
            return ResponseEntity.status(600).build();
        }
    }

    /**
     * 소속사 유저의 로그인 기능을 수행한다.
     *
     * @param dto : PUserRequestDto : email, password 속성 필.
     * @return 로그인 성공시 SimpleDto에 JWT를 담아 보낸다. 실패시 401 코드 반환
     */
    @PostMapping("/login")
    public ResponseEntity<JwtResponseDto> loginPUser(@ModelAttribute PUserRequestDto dto) {
        try {
            return ResponseEntity.ok(pUserService.login(dto));
        } catch (LoginException e) {
            return ResponseEntity.status(401).build();
        }
    }


}
