package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.EmailDuplicationException;
import com.ssafy.stargate.exception.LoginException;
import com.ssafy.stargate.exception.RegisterException;
import com.ssafy.stargate.model.dto.common.FUserDto;
import com.ssafy.stargate.model.dto.common.FUserFindIdDto;
import com.ssafy.stargate.model.dto.common.FUserFindPwDto;
import com.ssafy.stargate.model.dto.request.FUserLoginRequestDto;
import com.ssafy.stargate.model.dto.request.FUserUpdateRequestDto;
import com.ssafy.stargate.model.dto.response.JwtResponseDto;
import com.ssafy.stargate.model.entity.Certify;
import com.ssafy.stargate.model.entity.FUser;
import com.ssafy.stargate.model.entity.JwtToken;
import com.ssafy.stargate.model.repository.CertifyRepository;
import com.ssafy.stargate.model.repository.FUserRepository;
import com.ssafy.stargate.model.repository.JwtTokenRepository;
import com.ssafy.stargate.util.JwtTokenUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import java.security.Principal;
import java.util.Optional;


/**
 * 팬 유저 서비스 구현체
 * @author 남현실, 김도현
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
    
    @Autowired
    private CertifyRepository certifyRepository;

    @Autowired
    private JwtTokenRepository jwtTokenRepository;


    /**
     * 팬 유저 회원가입을 진행한다.
     *
     * @param dto [FUserRegisterRequestDto] 유저 회원가입 정보
     * @throws RegisterException 아이디 중복 가입 시 발생하는 에러
     */
    @Transactional
    public void create(@Validated FUserDto dto) throws EmailDuplicationException, RegisterException {
        FUser dbCheck = fUserRepository.findById(dto.getEmail()).orElse(null);
        if (dbCheck != null) {
            throw new EmailDuplicationException("아이디 중복");
        }

        dto.setPassword(passwordEncoder.encode(dto.getPassword()));

        FUser fuser = FUser.builder()
                .email(dto.getEmail())
                .name(dto.getName())
                .nickname(dto.getNickname())
                .password(dto.getPassword())
                .birthday(dto.getBirthday())
                .phone(dto.getPhone())
                .build();
        fUserRepository.save(fuser);
    }

    /**
     * 팬 로그인을 진행한다. refreshToken 을 JwtToken 에 저장
     * @param dto [FUserLoginRequestDto] 유저 로그인 정보
     * @return [JwtResponseDto] 새로 생성한 JWT
     * @throws LoginException 로그인 에러
     */
    @Override
    public JwtResponseDto login(FUserLoginRequestDto dto) throws LoginException {
        FUser fUser = fUserRepository.findById(dto.getEmail()).orElseThrow(() -> new LoginException("해당 이메일 없음"));

        if(passwordEncoder.matches(dto.getPassword(), fUser.getPassword())) {

            String refreshToken = jwtTokenUtil.createRefreshToken(fUser.getEmail(),"USER");

            String accessToken = jwtTokenUtil.createAccessToken(fUser.getEmail(),"USER");

            JwtToken jwtToken = JwtToken.builder()
                    .email(dto.getEmail())
                    .refreshToken(refreshToken)
                    .build();

            jwtTokenRepository.save(jwtToken);

             return JwtResponseDto.builder()
                    .refreshToken(refreshToken)
                    .accessToken(accessToken)
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
    public FUserDto getFUser(Principal principal){
        String email = principal.getName();
        FUser fUser = fUserRepository.findById(email).orElseThrow();

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
     * @param fUserDto FUserDto 회원 email 정보가 담긴 FUserDto 객체
     * @param principal Principal 유저 email이 포함된 principal 객체
     */
    @Override
    public void updateFUser(FUserUpdateRequestDto fUserDto, Principal principal) {

        FUser fUser = fUserRepository.findById(principal.getName()).orElseThrow();

        log.info("팬 유저 비밀번호 {}", fUser.getPassword());
        log.info("팬 유저 새로운 비밀번호 {}", fUserDto.getPassword());

        if(fUserDto.getNewPassword() != null && !passwordEncoder.matches(fUserDto.getNewPassword(), fUser.getPassword())){
            fUser.setPassword(passwordEncoder.encode(fUserDto.getNewPassword()));
        }
        log.info("팬 유저 입력 받은 이름 {}", fUserDto.getName());
        fUser.setName(fUserDto.getName());
        fUser.setNickname(fUserDto.getNickname());
        fUser.setBirthday(fUserDto.getBirthday());
        fUser.setPhone(fUserDto.getPhone());

        fUserRepository.save(fUser);
    }

    /**
     * FUser 회원 탈퇴
     * @param principal Principal 회원 email 정보가 담긴 FUserDto 객체
     */
    @Override
    public void deleteFUser(Principal principal) {
        fUserRepository.deleteById(principal.getName());
        jwtTokenRepository.deleteById(principal.getName());
    }

    /**
     * FUser 이름, 전화번호를 바탕으로 아이디 찾기
     * @param dto FUserFindIdDto 회원 email 을 찾기 위한 FUserFindIdDto 객체
     * @return FUserFindIdDto
     * @throws LoginException 아이디 찾기 실패
     */
    @Override
    public FUserFindIdDto getFUserId(FUserFindIdDto dto) throws LoginException {
        FUser fUser = fUserRepository.findByName(dto.getName());

        if(fUser == null || !fUser.getPhone().equals(dto.getPhone())){
            throw new LoginException("아이디 찾기 실패 : 해당 정보와 일치 하는 회원이 없습니다.");
        }
        return FUserFindIdDto.builder()
                .name(fUser.getName())
                .phone(fUser.getPhone())
                .email(fUser.getEmail())
                .build();
    }
    
    /**
     * TODO : 이메일로 인증 번호 보내기 ( 싸피에서 할 수 없어요,,, ) 인증번호 생성, 저장까지는 완료
     * 비밀번호 찾기를 위한 인증 번호 생성, 저장 및 이메일 전송 
     * @param dto FUserFindPwDto 회원 이메일 정보가 담긴 객체
     * @return FUserFindPwDto 이메일이 일치하는 회원에게 전송할 인증번호가 저장된 객체
     * @throws LoginException 해당 이메일의 회원 찾기 실패
     */
    @Override
    public FUserFindPwDto getCertifyCode(FUserFindPwDto dto) throws LoginException{

        log.info("비밀번호 찾기 {}", dto.getEmail());

        FUser fUser = fUserRepository.findById(dto.getEmail()).orElseThrow();

        log.info("이메일로 찾은 회원 정보 {}", fUser.getEmail());


        if(fUser != null){
            String certify = RandomStringUtils.randomNumeric(6);

            Certify code = Certify.builder()
                    .code(certify)
                    .fUser(fUser)
                    .build();

            certifyRepository.save(code);
            fUser.setCertify(code);

            return FUserFindPwDto.builder()
                    .code(certify)
                    .email(dto.getEmail())
                    .build();
        }else{
            throw new LoginException("해당 ID 의 회원은 존재하지 않습니다.");
        }
    }
    
    /**
     * 인증 번호 확인, 인증 번호 불일치하면 에러
     * @param dto FUserFindPwDto 이메일, 인증번호가 담긴 객체
     * @throws LoginException 인증 번호 불일치 에러
     */
    @Override
    public void checkCertify(FUserFindPwDto dto) throws LoginException{
        String code = dto.getCode();

        FUser fUser = certifyRepository.findById(dto.getCode()).get().getFUser();

        if (!dto.getEmail().equals(fUser.getEmail())){
            throw new LoginException("인증 번호가 일치하지 않습니다.");
        }
    }

    /**
     * FUser 비밀 번호 변경
     * @param dto FUserFindPwDto 회원 이메일과 새로 받은 비밀번호가 있는 객체
     */
    @Override
    public void updateFUserPw(FUserFindPwDto dto) {

        dto.setPassword(passwordEncoder.encode(dto.getPassword()));

        FUser fUser = fUserRepository.findById(dto.getEmail()).orElseThrow();

        fUser.setPassword(dto.getPassword());

        fUserRepository.save(fUser);

        Certify certify = certifyRepository.findByfUserEmail(dto.getEmail());

        if(certify != null){
            certifyRepository.delete(certify);
        }

    }
}


