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
import com.ssafy.stargate.model.entity.*;
import com.ssafy.stargate.model.repository.*;
import com.ssafy.stargate.util.FileUtil;
import com.ssafy.stargate.util.JwtTokenUtil;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import java.security.Principal;
import java.util.List;
import java.util.Optional;


/**
 * 팬 유저 서비스 구현체
 *
 * @author 남현실, 김도현
 */
@Service
@Slf4j
@Transactional
public class FUserServiceImpl implements FUserService {

    private final FUserRepository fUserRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenUtil jwtTokenUtil;

    private final CertifyRepository certifyRepository;

    private final JavaMailSender mailSender;

    private final PolaroidRepository polaroidRepository;

    private final FileUtil fileUtil;

    private final JwtTokenRepository jwtTokenRepository;

    private final String polaroidFilePath;

    private final String username;

    public FUserServiceImpl(
            FUserRepository fUserRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenUtil jwtTokenUtil,
            CertifyRepository certifyRepository,
            JavaMailSender mailSender,
            PolaroidRepository polaroidRepository,
            FileUtil fileUtil,
            JwtTokenRepository jwtTokenRepository,
            @Value("${s3.filepath.polaroid}") String polaroidFilePath,
            @Value("${spring.mail.username}") String username
    ) {
        this.fUserRepository = fUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenUtil = jwtTokenUtil;
        this.certifyRepository = certifyRepository;
        this.mailSender = mailSender;
        this.polaroidRepository = polaroidRepository;
        this.fileUtil = fileUtil;
        this.jwtTokenRepository = jwtTokenRepository;
        this.polaroidFilePath = polaroidFilePath;
        this.username = username;
    }

    /**
     * 팬 유저 회원가입을 진행한다.
     * 이미 해당 전화 번호와 이름의 회원이 가입되어 있는지 확인
     * 
     * @param dto [FUserCreateRequestDto] 유저 회원가입 정보
     * @throws EmailDuplicationException 아이디(이메일) 중복 가입 시 발생하는 에러
     * @throws LoginException 이미 해당 이름과 전화번호로 회원 가입되어 있는 회원이 존재할 때 발생하는 에러
     */

    public void create(@Validated FUserCreateRequestDto dto) throws EmailDuplicationException ,RegisterException {

        if (isDuplicatedEmail(dto.getEmail())) {
            throw new EmailDuplicationException("아이디 중복");
        }

        FUser existingFUser = fUserRepository.findByNameAndPhone(dto.getName(), dto.getPhone()).orElse(null);
        
        if(existingFUser != null){
            throw new RegisterException("해당 이름과 전화번호 정보를 가진 회원이 존재합니다. 아이디 찾기를 해주세요");
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
     *
     * @param dto [FUserLoginRequestDto] 유저 로그인 정보
     * @return JwtResponseDto 새로 생성한 JWT
     * @throws NotFoundException 존재하지 않는 회원 에러
     * @throws LoginException    로그인 실패 에러
     */
    @Override
    public JwtResponseDto login(FUserLoginRequestDto dto) throws NotFoundException, LoginException {
        FUser fUser = fUserRepository.findById(dto.getEmail()).orElseThrow(() -> new NotFoundException("해당 회원 정보는 존재하지 않는 회원입니다."));

        if (passwordEncoder.matches(dto.getPassword(), fUser.getPassword())) {

            String refreshToken = jwtTokenUtil.createRefreshToken(fUser.getEmail(), "USER");

            String accessToken = jwtTokenUtil.createAccessToken(fUser.getEmail(), "USER");

            JwtToken token = JwtToken.builder()
                    .email(dto.getEmail())
                    .refreshToken(refreshToken)
                    .build();

            jwtTokenRepository.save(token);

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
     *
     * @param principal 유저 email이 포함된 principal 객체
     * @return FUserResponseDto 회원정보 객체
     * @throws NotFoundException 존재하지 않는 회원 에러
     */
    @Override
    public FUserResponseDto getFUser(Principal principal) throws NotFoundException {

        log.info("principal in getFUser {}", principal.getName());
        String email = principal.getName();

        FUser fUser = fUserRepository.findById(email).orElseThrow(() -> new NotFoundException("해당하는 회원 정보를 찾지 못했습니다."));

        return FUserResponseDto.builder()
                .name(fUser.getName())
                .email(fUser.getEmail())
                .nickname(fUser.getNickname())
                .password(fUser.getPassword())
                .birthday(fUser.getBirthday())
                .phone(fUser.getPhone())
                .build();
    }


    /**
     * FUser 회원 정보 수정
     *
     * @param fUserDto  FUserUpdateRequestDto 회원 email 정보가 담긴 FUserDto 객체
     * @param principal Principal 유저 email이 포함된 principal 객체
     * @return FUserResponseDto 업데이트된 회원 정보 dto
     * @throws NotFoundException 존재하지 않는 회원 에러
     */
    @Override
    public FUserResponseDto updateFUser(FUserUpdateRequestDto fUserDto, Principal principal) throws NotFoundException {

        FUser fUser = fUserRepository.findById(principal.getName()).orElseThrow(() -> new NotFoundException("해당하는 회원 정보를 찾지 못했습니다."));

        log.info("팬 유저 비밀번호 {}", fUser.getPassword());
        log.info("팬 유저 새로운 비밀번호 {}", fUserDto.getPassword());

        if (fUserDto.getNewPassword() != null && !passwordEncoder.matches(fUserDto.getNewPassword(), fUser.getPassword())) {
            fUser.setPassword(passwordEncoder.encode(fUserDto.getNewPassword()));
        }
        log.info("팬 유저 입력 받은 이름 {}", fUserDto.getName());
        fUser.setName(fUserDto.getName());
        fUser.setNickname(fUserDto.getNickname());
        fUser.setBirthday(fUserDto.getBirthday());
        fUser.setPhone(fUserDto.getPhone());

        FUser savedFUser = fUserRepository.save(fUser);

        return FUserResponseDto.builder()
                .email(savedFUser.getEmail())
                .password(savedFUser.getPassword())
                .name(savedFUser.getName())
                .nickname(savedFUser.getNickname())
                .birthday(savedFUser.getBirthday())
                .phone(savedFUser.getPhone())
                .build();
    }

    /**
     * FUser 회원 탈퇴
     *
     * @param principal Principal 회원 email 정보가 담긴 FUserDto 객체
     */
    @Override
    public void deleteFUser(Principal principal) {
        fUserRepository.deleteById(principal.getName());
        jwtTokenRepository.deleteById(principal.getName());
        deleteAllPolaroid(principal.getName());
    }

    /**
     * FUser 이름, 전화번호를 바탕으로 아이디 찾기
     * 동명이인 있을 경우 고려해서 아이디 & 전화번호 일치하는 회원으로 찾기
     *
     * @param dto FUserFindIdRequestDto 회원 email 을 찾기 위한 FUserFindIdDto 객체
     * @return FUserFindIdResponseDto 회원 아이디가 담긴 dto
     * @throws NotFoundException 존재하지 않는 회원 에러
     */
    @Override
    public FUserFindIdResponseDto getFUserId(FUserFindIdRequestDto dto) throws NotFoundException {

        FUser fUser = fUserRepository.findByNameAndPhone(dto.getName(), dto.getPhone()).orElseThrow(() -> new NotFoundException("아이디 찾기 실패 : 해당 이름, 전화번호로 가입되어 있는 회원이 없습니다."));
        
        return FUserFindIdResponseDto.builder()
                .name(fUser.getName())
                .phone(fUser.getPhone())
                .email(fUser.getEmail())
                .build();
    }

    /**
     * 비밀번호 찾기를 위한 인증 번호 생성해서 DB 에 저장 및 해당 인증 번호를 팬 유저 이메일로 전송
     * 이미 certify 에 저장된 유저인 경우 저장된 인증번호 변경
     * @param dto FUserFindPwRequestDto 회원 이메일 정보가 담긴 객체
     * @return FUserFindPwResponseDto 이메일이 일치하는 회원에게 전송할 인증번호가 저장된 객체
     * @throws NotFoundException 존재하지 않는 회원 에러
     */
    @Override
    public FUserFindPwResponseDto getCertifyCode(FUserFindPwRequestDto dto) throws NotFoundException {

        log.info("비밀번호 찾기 {}", dto.getEmail());

        FUser fUser = fUserRepository.findById(dto.getEmail()).orElseThrow(() -> new NotFoundException("해당하는 회원 정보를 찾지 못했습니다."));

        log.info("이메일로 찾은 회원 정보 {}", fUser.getEmail());


        if (fUser != null) {

            Certify existingUser = certifyRepository.findByfUserEmail(dto.getEmail()).orElse(null);

            String certify = RandomStringUtils.randomNumeric(6);

            if(existingUser == null){

                existingUser = Certify.builder()
                        .code(certify)
                        .fUser(fUser)
                        .build();
            } else {
                existingUser.setCode(certify);
            }

            Certify savedCertify = certifyRepository.save(existingUser);
            fUser.setCertify(savedCertify);

            sendCodeByMail(username, dto.getEmail(), certify);

            return FUserFindPwResponseDto.builder()
                    .code(certify)
                    .email(dto.getEmail())
                    .build();
        } else {
            throw new NotFoundException("해당 ID 의 회원은 존재하지 않습니다.");
        }
    }

    /**
     * 인증 번호 확인, 인증 번호 불일치하면 에러
     *
     * @param dto FUserCheckCodeRequestDto 이메일, 인증번호가 담긴 객체
     * @throws LoginException    인증번호 불일치 에러
     * @throws NotFoundException 존재하지 않는 회원 에러
     */
    @Override
    public void checkCertify(FUserCheckCodeRequestDto dto) throws LoginException, NotFoundException {
        String code = dto.getCode();

        Certify certify = certifyRepository.findByfUserEmail(dto.getEmail()).orElse(null);

        if (certify == null) {
            throw new NotFoundException("해당하는 회원 정보를 찾지 못했습니다.");
        }

        if (!dto.getCode().equals(certify.getCode())) {
            throw new LoginException("인증 번호가 일치하지 않습니다.");
        }
    }

    /**
     * FUser 비밀 번호 변경
     *
     * @param dto FUserResetPwRequestDto 회원 이메일과 새로 받은 비밀번호가 있는 객체
     * @throws NotFoundException 존재하지 않는 회원 에러, 존재하지 않는 인증번호 에러
     */
    @Override
    public void updateFUserPw(FUserResetPwRequestDto dto) throws NotFoundException {

        dto.setPassword(passwordEncoder.encode(dto.getPassword()));

        FUser fUser = fUserRepository.findById(dto.getEmail()).orElseThrow(() -> new NotFoundException("해당하는 회원 정보를 찾지 못했습니다."));

        fUser.setPassword(dto.getPassword());

        fUserRepository.save(fUser);

        Certify certify = certifyRepository.findByfUserEmail(dto.getEmail()).orElseThrow(() -> new NotFoundException("해당 회원의 인증번호가 존재하지 않습니다."));

        certifyRepository.delete(certify);

    }

    /**
     * 회원 가입시 이메일 중복 여부 체크
     *
     * @param dto FUserEmailCheckRequestDto 회원 가입하려는 이메일 정보가 담긴 dto
     * @return FUserEmailCheckResponseDto 이메일 존재 여부가 담긴 dto
     */
    @Override
    public FUserEmailCheckResponseDto checkDuplicateEmail(FUserEmailCheckRequestDto dto) {
        return FUserEmailCheckResponseDto.builder()
                .exist(isDuplicatedEmail(dto.getEmail()))
                .build();
    }

    /**
     * 로그아웃 수행, JwtToken 에서 회원의 refreshToken 삭제
     *
     * @throws NotFoundException refreshToken 저장되어 있지 않은 상태, 로그아웃 되어 있는 상태
     */
    @Override
    public void logout() throws NotFoundException {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        JwtToken refreshToken = jwtTokenRepository.findById(email).orElse(null);

        if (refreshToken != null) {
            jwtTokenRepository.deleteById(email);
        } else {
            throw new NotFoundException("해당 유저는 이미 로그아웃 상태입니다.");
        }

        log.info("로그아웃 되었습니다");
    }

    /**
     * 이메일이 중복 확인
     *
     * @param email String 이메일 정보
     * @return boolean , 해당 이메일이 이미 존재하면 true, 존재하지 않으면 false
     */
    private boolean isDuplicatedEmail(String email) {
        Boolean isDuplicated = false;
        FUser fUser = fUserRepository.findById(email).orElse(null);

        if (fUser != null) {
            isDuplicated = true;
        }
        return isDuplicated;
    }

    /**
     * 인증 번호가 적힌 이메일 전송
     *
     * @param stargateEmail String stargate 이메일
     * @param email         String 인증번호를 받을 이메일
     * @param code          String 인증번호
     */
    private void sendCodeByMail(String stargateEmail, String email, String code) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(stargateEmail);
        message.setTo(email);
        message.setSubject("[스타게이트] 비밀번호 재설정을 위한 인증 번호 발송");
        message.setText("인증번호는 " + code + "입니다.");

        mailSender.send(message);
    }


    /**
     * 해당 유저의 모든 폴라로이드 정보를 삭제한다.
     *
     * @param email [String] 팬 유저 이메일 (id)
     */
    private void deleteAllPolaroid(String email) {
        Optional<List<Polaroid>> polaroids = polaroidRepository.findPolaroidList(email);
        if (!polaroids.isPresent()) {
            return;
        }
        for (Polaroid polaroid : polaroids.get()) {
            fileUtil.deleteFile(polaroidFilePath, polaroid.getImage());
        }
        polaroidRepository.deleteAllByFUserEmail(email);
    }

}


