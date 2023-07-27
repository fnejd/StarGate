package com.ssafy.stargate.model.service;


import com.ssafy.stargate.exception.InvalidTokenException;
import com.ssafy.stargate.model.dto.response.JwtResponseDto;
import com.ssafy.stargate.model.entity.JwtToken;
import com.ssafy.stargate.model.repository.JwtTokenRepository;
import com.ssafy.stargate.util.JwtTokenUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * JWT 토큰 재생성 구현체
 *
 * @author 김도현
 */
@Service
@Slf4j
public class JwtTokenServiceImpl implements JwtTokenService {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtTokenRepository jwtTokenRepository;
    
    /**
     * refreshToken 을 바탕으로 accessToken 새로 생성 (JwtToken 에 저장되어 있는 refreshToken 과 비교
     * @param refreshToken String refreshToken
     * @return JwtResponseDto 새로 생성된 accessToken
     * @throws InvalidTokenException 유효하지 않은 토큰 에러
     */
    @Override
    public JwtResponseDto createAccessToken(String refreshToken) throws InvalidTokenException {

        if (jwtTokenUtil.validateToken(refreshToken) && !jwtTokenUtil.isTokenExpired(refreshToken)) {

            String email = jwtTokenUtil.getEmailFromToken(refreshToken);

            JwtToken jwtToken = jwtTokenRepository.findById(email).orElseThrow();

            if (jwtToken.getRefreshToken().equals(refreshToken)) {

                return JwtResponseDto.builder()
                        .refreshToken(refreshToken)
                        .accessToken(jwtTokenUtil.createAccessToken(email, jwtTokenUtil.getAuthorityFromToken(refreshToken)))
                        .build();
            } else {
                throw new InvalidTokenException("refreshToken 이 일치하지 않습니다.");
            }
        } else {
            throw new InvalidTokenException("유효하지 않은 refreshToken 입니다");
        }
    }
}
