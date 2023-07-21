package com.ssafy.stargate.controller;

import com.ssafy.stargate.exception.EmailDuplicationException;
import com.ssafy.stargate.exception.LoginException;
import com.ssafy.stargate.exception.RegisterException;
import com.ssafy.stargate.model.dto.common.FUserDto;
import com.ssafy.stargate.model.dto.request.FUserLoginRequestDto;
import com.ssafy.stargate.model.dto.request.FUserRegisterRequestDto;
import com.ssafy.stargate.model.dto.request.PUserRequestDto;
import com.ssafy.stargate.model.dto.response.JwtResponseDto;
import com.ssafy.stargate.model.service.FUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;

/**
 * 팬 유저에 관한 Controller이다.
 * 회원가입, 로그인을 지원한다.
 */
@RestController
@RequestMapping("/fusers")
@RequiredArgsConstructor
@Slf4j
public class FUserController {
    private final FUserService fUserService;

    /**
     * 팬 유저 회원가입
     *
     * @param dto [FUserRegisterRequestDto] 팬 유저 회원가입 request
     * @return [ResponseEntity<?>]성공: [200], 실패: [600]
     * @throws RegisterException 회원가입 등록 실패
     */
    @PostMapping("/register")
    public ResponseEntity<?> createFUsers(@ModelAttribute FUserRegisterRequestDto dto) throws EmailDuplicationException, RegisterException {
        fUserService.create(dto);
        return ResponseEntity.ok(null);
    }

    /**
     * 팬 로그인
     * @param dto [FUserLoginRequestDto] 팬 로그인 request
     * @return [ResponseEntity<JwtResponseDto>] 성공: [200] JWT Response, 실패: [401]
     * @throws LoginException
     */
    @PostMapping("/login")
    public ResponseEntity<JwtResponseDto> loginFUsers(@ModelAttribute FUserLoginRequestDto dto) throws LoginException {
        try {
            return ResponseEntity.ok(fUserService.login(dto));
        } catch (LoginException e) {
            return ResponseEntity.status(401).build();
        }
    }

    /**
     * 팬 유저 마이페이지 정보
     * @param email HashMap<String, Object> email 회원 이메일
     * @param principal 유저 email이 담긴 객체
     * @return [ResponseEntity<FUserDto>] 회원 정보
     * @throws Exception
     */
    @GetMapping("/info")
    public ResponseEntity<FUserDto> getFUserInfo(@RequestBody HashMap<String, Object> email, Principal principal) throws Exception {
        FUserDto fUser = fUserService.getFUser(principal);
        log.info("user{}", fUser);
        return ResponseEntity.ok(fUser);
    }


    /**
     * FUser 회원 정보 변경 (name, nickname, password, birthday 변경 가능)
     * @param dto 팬회원 정보가 저장된 DTO
     * @return 성공 -> 200 코드 반환
     */
    @PutMapping("/update")
    public ResponseEntity<?> updateFUserInfo(@ModelAttribute FUserDto dto){
        fUserService.updateFUser(dto);
        return ResponseEntity.ok(null);
    }

    /**
     * FUser 회원 탈퇴
     * @param dto 팬회원 정보가 저장된 DTO
     * @param principal 유저 email이 담긴 객체
     * @return 성공 -> 200 코드 반환
     */

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFUserInfo(@RequestBody FUserDto dto, Principal principal){
        fUserService.deleteFUser(dto, principal);
        return ResponseEntity.ok(null);
    }



}
