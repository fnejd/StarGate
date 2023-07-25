package com.ssafy.stargate.controller;

import com.ssafy.stargate.exception.EmailDuplicationException;
import com.ssafy.stargate.exception.LoginException;
import com.ssafy.stargate.exception.RegisterException;
import com.ssafy.stargate.model.dto.common.FUserDto;
import com.ssafy.stargate.model.dto.common.FUserFindIdDto;
import com.ssafy.stargate.model.dto.common.FUserFindPwDto;
import com.ssafy.stargate.model.dto.request.FUserLoginRequestDto;
import com.ssafy.stargate.model.dto.request.FUserUpdateRequestDto;
import com.ssafy.stargate.model.dto.response.JwtResponseDto;
import com.ssafy.stargate.model.service.FUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

/**
 * 팬 유저에 관한 Controller이다.
 * 팬 정보 CRUD 및 로그인을 지원한다.
 */
@RestController
@RequestMapping("/fusers")
@RequiredArgsConstructor
@Slf4j
public class FUserController {
    @Autowired
    private final FUserService fUserService;

    /**
     * 팬 유저 회원가입
     *
     * @param dto [FUserRegisterRequestDto] 팬 유저 회원가입 request
     * @return [ResponseEntity<?>]성공: [200], 실패: [600]
     * @throws RegisterException 회원가입 등록 실패
     */
    @PostMapping("/register")
    public ResponseEntity<?> createFUsers(@ModelAttribute @Validated FUserDto dto) throws EmailDuplicationException, RegisterException {
        fUserService.create(dto);
        return ResponseEntity.ok(null);
    }

    /**
     * 팬 로그인
     * @param dto [FUserLoginRequestDto] 팬 로그인 request
     * @return [ResponseEntity<JwtResponseDto>] 성공: [200] JWT Response, 실패: [401]
     * @throws LoginException
     */
    /*
    TODO: Login error throws로 바꾸기
     */
    @PostMapping("/login")
    public ResponseEntity<JwtResponseDto> loginFUsers(@ModelAttribute @Validated FUserLoginRequestDto dto) throws LoginException {
        try {
            return ResponseEntity.ok(fUserService.login(dto));
        } catch (LoginException e) {
            return ResponseEntity.status(401).build();
        }
    }

    /**
     * 팬 유저 마이페이지 정보
     * @param principal Principal 유저 email이 담긴 객체
     * @return [ResponseEntity<FUserDto>] 회원 정보
     */
    @GetMapping("/get")
    public ResponseEntity<FUserDto> getFUserInfo(Principal principal){
        FUserDto fUser = fUserService.getFUser(principal);
        log.info("user{}", fUser);
        return ResponseEntity.ok(fUser);
    }

    /**
     * FUser 회원 정보 변경 (name, nickname, password, birthday 변경 가능)
     * @param dto FUserUpdateRequestDto 팬회원 정보가 저장된 DTO
     * @param principal Principal 유저 email이 담긴 객체
     * @return 성공 -> 200 코드 반환
     */
    @PutMapping("/update")
    public ResponseEntity<?> updateFUserInfo(@ModelAttribute @Validated FUserUpdateRequestDto dto, Principal principal){
        fUserService.updateFUser(dto, principal);
        return ResponseEntity.ok(null);
    }


    /**
     * FUser 회원 탈퇴
     * @param principal Principal 유저 email이 담긴 객체
     * @return 성공 -> 200 코드 반환
     */
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFUserInfo(Principal principal){
        fUserService.deleteFUser(principal);
        return ResponseEntity.ok(null);
    }

    /**
     * FUser 아이디 찾기
     * @param dto FUserFindIdDto 아이디를 찾기 위한 객체 (name,phone 정보 저장)
     * @return [ResponseEntity<FUserFindIdDto>] (아이디- 이메일) 저장되어 있는 객체
     * @throws LoginException
     */
    @PostMapping("/find-id")
    public ResponseEntity<?> findFUserId(@ModelAttribute @Validated FUserFindIdDto dto) throws LoginException {
        try {
            return ResponseEntity.ok(fUserService.getFUserId(dto));
        } catch (LoginException e) {
            return ResponseEntity.status(e.getStatus()).build();
        }
    }

    /**
     * FUser 비밀번호 찾기 요청에 대해 인증 번호 발송
     * @param dto FUserFindPwDto 비밀번호를 찾기 위한 객체 (이메일 정보 필수로 저장)
     * @return [ResponseEntity<FUserFindPwDto>] 인증 번호가 저장되어 있는 객체 반환
     * @throws LoginException
     */
    @PostMapping("/get-code")
    public ResponseEntity<?> getCertifyCode(@RequestBody @Validated FUserFindPwDto dto) throws LoginException{
        try {
            return ResponseEntity.ok(fUserService.getCertifyCode(dto));
        }catch (LoginException e){
            return ResponseEntity.status(e.getStatus()).build();
        }
    }

    /**
     * 비밀번호 재설정하려 할때 인증 번호 확인 & 비밀번호 변경
     * @param dto FUserFindPwDto 인증 번호를 담고 있는 객체 (이메일 정보 필수로 저장)
     * @return 성공 -> 200, 실패 -> 401
     * @throws LoginException 인증 번호 불일치
     */
    @PostMapping("/check-code")
    public ResponseEntity<?> checkCertifyCode(@RequestBody @Validated FUserFindPwDto dto) throws LoginException{
        try{
            fUserService.checkCertify(dto);

            return ResponseEntity.ok(null);
        }catch (LoginException e){
            return ResponseEntity.status(e.getStatus()).build();
        }
    }

    /**
     * 비밀 번호 재설정
     * @param dto FUserFindPwDto FUser 의 이메일 정보와 새로운 비밀번호가 저장된 객체
     * @return 성공 -> 200
     */
    @PostMapping("/new-pw")
    public ResponseEntity<?> updateFUserPassword(@RequestBody @Validated FUserFindPwDto dto){
        fUserService.updateFUserPw(dto);
        return ResponseEntity.ok(null);
    }
}
