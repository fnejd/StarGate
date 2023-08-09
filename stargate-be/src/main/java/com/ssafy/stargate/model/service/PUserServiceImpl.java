package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.EmailDuplicationException;
import com.ssafy.stargate.exception.LoginException;
import com.ssafy.stargate.exception.PasswordFailException;
import com.ssafy.stargate.exception.RegisterException;
import com.ssafy.stargate.model.dto.response.JwtResponseDto;
import com.ssafy.stargate.model.dto.common.PUserDto;
import com.ssafy.stargate.model.entity.PUser;
import com.ssafy.stargate.model.repository.PUserRepository;
import com.ssafy.stargate.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;

/**
 * 소속사 유저완 관련된 서비스의 구현체
 *
 * @author 백승윤
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class PUserServiceImpl implements PUserService {

    private final PUserRepository pUserRepository;


    private final PasswordEncoder passwordEncoder;


    private final JwtTokenUtil jwtTokenUtil;

    /**
     * 소속사 직원에 대한 회원가입을 수행한다.
     *
     * @param dto : PUserRegisterRequestDto : 소속사 회원가입 정보를 지닌 dto
     * @throws RegisterException 중복가입 발생시 던지는 예외이다.
     */
    @Override
    public void register(PUserDto dto) throws EmailDuplicationException, RegisterException {
        PUser dbCheck = pUserRepository.findById(dto.getEmail()).orElse(null);
        if (dbCheck != null) {
            throw new EmailDuplicationException("아이디 중복");
        }
        PUser pUser = PUser.builder()
                .email(dto.getEmail())
                .code(dto.getCode())
                .password(passwordEncoder.encode(dto.getPassword()))
                .joinDate(LocalDateTime.now())
                .build();
        pUserRepository.save(pUser);
        log.info("TEST FOR JPA TIMEZONE : {}",pUser.getCreateDate());
    }

    /**
     * 소속사 이메일 중복검사를 수행한다.
     * @param email String 소속사 이메일 후보
     * @return 사용 여부(사용하면 true)
     */
    @Override
    public boolean checkEmailExist(String email) {
        return pUserRepository.existsById(email);
    }

    /**
     * 소속사 회원의 로그인을 수행. 성공시 JWT를 생성 및 반환하도록 한다.
     *
     * @param dto : PUserRequestDto 회원가입 정보가 담긴 dto. email와 password를 사용
     * @return String : 새로 생성한 JWT 를 반환한다.
     */
    @Override
    public JwtResponseDto login(PUserDto dto) throws LoginException {
        PUser pUser = pUserRepository.findById(dto.getEmail()).orElseThrow(() -> new LoginException("해당 이메일 없음"));
        if (passwordEncoder.matches(dto.getPassword(), pUser.getPassword())) {
            log.info("CreateDate = {}",pUser.getCreateDate());
            return JwtResponseDto.builder()
                    .refreshToken(jwtTokenUtil.createRefreshToken(pUser.getEmail(), "PRODUCER"))
                    .accessToken(jwtTokenUtil.createAccessToken(pUser.getEmail(), "PRODUCER"))
                    .build();
        } else {
            throw new LoginException("소속사 로그인 실패");
        }
    }

    /**
     * 소속사 유저를 삭제한다.
     *
     * @param dto PUserRequestDto 삭제할 유저의 이메일, 비밀번호
     */
    @Override
    public void deletePUser(PUserDto dto, Principal principal) {
        PUser pUser = pUserRepository.findById(principal.getName()).orElseThrow();
        if (passwordEncoder.matches(dto.getPassword(), pUser.getPassword())) {
            pUserRepository.delete(pUser);
        } else {
            throw new PasswordFailException("비밀번호가 틀렸습니다.");
        }
    }

    /**
     * 소속사 계정 정보를 principal을 기반으로 가져오자.
     *
     * @param principal 인증 객체(Email 추출용)
     * @return PUserData 소속사 계정 정보
     */
    @Override
    public PUserDto getPUserData(Principal principal) {
        PUser pUser = pUserRepository.findById(principal.getName()).orElseThrow();
        return PUserDto.builder()
                .name(pUser.getName())
                .email(pUser.getEmail())
                .code(pUser.getCode())
                .build();
    }

    /**
     * 소속사 유저 정보를 업데이트한다.
     * 단 없는 데이터는 업데이트하지 않는다.
     *
     * @param pUserDto 갱신할 유저 정보.
     * @return 상태코드.(200 또는 401 ( 비밀번호 틀림))
     */
    @Override
    public int updatePUser(PUserDto pUserDto) {
        PUser pUser = pUserRepository.findById(pUserDto.getEmail()).orElseThrow();
        if (passwordEncoder.matches(pUserDto.getOriginalPassword(), pUser.getPassword())) {
            if (pUserDto.getName() != null) {
                pUser.setName(pUserDto.getName());
            }
            if (pUserDto.getCode() != null) {
                pUser.setCode(pUser.getCode());
            }
            if (pUserDto.getPassword() != null) {
                pUser.setPassword(passwordEncoder.encode(pUserDto.getPassword()));
            }
            pUserRepository.save(pUser);
            return 200;
        } else {
            return 401;
        }
    }
}
