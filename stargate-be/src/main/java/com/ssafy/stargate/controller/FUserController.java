package com.ssafy.stargate.controller;

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
import com.ssafy.stargate.model.service.FUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    private final FUserService fUserService;


    /**
     * 팬 유저 회원가입
     *
     * @param dto [FUserCreateRequestDto] 팬 유저 회원가입 request
     * @return [ResponseEntity<?>]성공: [200], 실패: [600]
     * @throws EmailDuplicationException 아이디(이메일) 중복 가입 시 발생하는 에러
     * @throws RegisterException         해당 이름, 전화번호의 회원이 이미 존재할 때 발생하는 에러
     */
    @PostMapping("/register")
    public ResponseEntity<Void> createFUsers(@ModelAttribute @Validated FUserCreateRequestDto dto) throws EmailDuplicationException, RegisterException {
        fUserService.create(dto);
        return ResponseEntity.ok(null);
    }


    /**
     * 팬 로그인
     *
     * @param dto [FUserLoginRequestDto] 팬 로그인 request
     * @return [ResponseEntity<JwtResponseDto>] 성공: [200] JWT Response, 실패: [401]
     * @throws NotFoundException 존재하지 않는 회원 에러
     * @throws LoginException    로그인 실패 에러
     */
    @PostMapping("/login")
    public ResponseEntity<JwtResponseDto> loginFUsers(@ModelAttribute @Validated FUserLoginRequestDto dto) throws NotFoundException, LoginException {

        return ResponseEntity.ok(fUserService.login(dto));
    }

    /**
     * 팬 유저 마이페이지 정보
     *
     * @param principal Principal 유저 email이 담긴 객체
     * @return [ResponseEntity<FUserResponseDto>] 회원 정보
     * @throws NotFoundException 존재하지 않는 회원 에러
     */
    @GetMapping("/get")
    public ResponseEntity<FUserResponseDto> getFUserInfo(Principal principal) throws NotFoundException {

        FUserResponseDto fUser = fUserService.getFUser(principal);
        log.info("user{}", fUser);
        return ResponseEntity.ok(fUser);
    }

    /**
     * FUser 회원 정보 변경 (name, nickname, password, birthday 변경 가능)
     *
     * @param dto       FUserUpdateRequestDto 팬회원 정보가 저장된 dto
     * @param principal Principal 유저 email이 담긴 객체
     * @return [ResponseEntity<FUserResponseDto>] 업데이트된 회원 정보 dto
     * @throws NotFoundException 존재하지 않는 회원 에러
     */
    @PutMapping("/update")
    public ResponseEntity<FUserResponseDto> updateFUserInfo(@ModelAttribute @Validated FUserUpdateRequestDto dto, Principal principal) throws NotFoundException {

        return ResponseEntity.ok(fUserService.updateFUser(dto, principal));
    }

    /**
     * FUser 회원 탈퇴
     *
     * @param principal Principal 유저 email이 담긴 객체
     * @return 성공 -> 200 코드 반환
     */
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFUserInfo(Principal principal) {

        fUserService.deleteFUser(principal);
        return ResponseEntity.ok(null);
    }


    /**
     * FUser 아이디 찾기
     *
     * @param dto FUserFindIdRequestDto 아이디를 찾기 위한 객체 (name,phone 정보 저장)
     * @return [ResponseEntity<FUserFindIdResponseDto>] (아이디- 이메일) 저장되어 있는 객체
     * @throws NotFoundException 존재하지 않는 회원 에러
     */
    @PostMapping("/find-id")
    public ResponseEntity<FUserFindIdResponseDto> findFUserId(@ModelAttribute @Validated FUserFindIdRequestDto dto) throws NotFoundException {

        return ResponseEntity.ok(fUserService.getFUserId(dto));
    }

    /**
     * FUser 비밀번호 찾기 요청에 대해 인증 번호 발송
     *
     * @param dto FUserFindPwRequestDto 비밀번호를 찾기 위한 객체 (이메일 정보 필수로 저장)
     * @return [ResponseEntity<FUserFindPwResponseDto>] 인증 번호가 저장되어 있는 객체 반환
     * @throws NotFoundException 존재하지 않는 회원 에러
     */
    @PostMapping("/get-code")
    public ResponseEntity<FUserFindPwResponseDto> getCertifyCode(@RequestBody @Validated FUserFindPwRequestDto dto) throws NotFoundException {

        return ResponseEntity.ok(fUserService.getCertifyCode(dto));
    }


    /**
     * 비밀번호 재설정하려 할때 인증 번호 확인 & 비밀번호 변경
     *
     * @param dto FUserCheckCodeRequestDto 인증 번호를 담고 있는 객체 (이메일 정보 필수로 저장)
     * @return 성공 -> 200, 실패 -> 401
     * @throws LoginException    인증번호 불일치 에러
     * @throws NotFoundException 존재하지 않는 회원 에러
     */
    @PostMapping("/check-code")
    public ResponseEntity<?> checkCertifyCode(@RequestBody @Validated FUserCheckCodeRequestDto dto) throws LoginException, NotFoundException {

        fUserService.checkCertify(dto);
        return ResponseEntity.ok(null);
    }

    /**
     * 비밀 번호 재설정
     *
     * @param dto FUserResetPwRequestDto FUser 의 이메일 정보와 새로운 비밀번호가 저장된 객체
     * @return 성공 -> 200
     * @throws NotFoundException 존재하지 않는 회원 에러, 존재하지 않는 인증번호 에러
     */
    @PostMapping("/new-pw")
    public ResponseEntity<?> updateFUserPassword(@RequestBody @Validated FUserResetPwRequestDto dto) throws NotFoundException {

        fUserService.updateFUserPw(dto);
        return ResponseEntity.ok(null);
    }

    /**
     * 이미 해당 이메일로 회원가입된 계정이 있는지 확인
     *
     * @param dto FUserEmailCheckRequestDto 회원 가입하려는 이메일 정보가 담긴 dto
     * @return [ResponseEntity<FUserEmailCheckResponseDto>] 이메일 중복 여부 담긴 dto
     */
    @PostMapping("/check-email")
    public ResponseEntity<FUserEmailCheckResponseDto> checkDuplicateEmail(@RequestBody FUserEmailCheckRequestDto dto) {

        return ResponseEntity.ok(fUserService.checkDuplicateEmail(dto));
    }


    /**
     * 로그 아웃 (JwtToken 에 저장되어 있는 유저의 refreshToken 삭제)
     *
     * @return 성공 -> 200
     * @throws NotFoundException 해당 유저의 refreshToken이 저장되어 있지 않아서 발생
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout() throws NotFoundException {
        fUserService.logout();
        return ResponseEntity.ok(null);
    }
}