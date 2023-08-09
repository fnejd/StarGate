package com.ssafy.stargate.util;


import com.ssafy.stargate.exception.InvalidTokenException;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;
import org.springframework.util.StringUtils;

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.Base64;
import java.util.Date;


/**
 * JWT 토큰 설정
 * @author 김도현
 */
@Slf4j
@Component
public class JwtTokenUtil {

    private final byte[] key;

    private final static Long ACCESS_TOKEN_VALID_TIME = 24 * 60 * 60 * 1000L;

    private final static Long REFRESH_TOKEN_VALID_TIME = 14 * 24 * 60 * 60 * 1000L;


    /**
     * application-jwt 에 저장되어 있는 secretKey 로 key 초기화
     *
     * @param secretkey byte[]
     */
    public JwtTokenUtil(@Value("${jwt.token.secretkey}") String secretkey) {
        this.key = secretkey.getBytes(StandardCharsets.UTF_8);
    }

    /**
     * 토큰 생성
     * @param email  String 사용자 이메일
     * @param expire Long 토큰 만료 기한
     * @param auth   String 권한 정보
     * @return String 토큰
     */
    public String createToken(String email, Long expire, String auth) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("auth", auth);

        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + expire))
                .signWith(SignatureAlgorithm.HS256, Base64.getEncoder().encodeToString(key))
                .compact();

    }


    /**
     * AccessToken 생성
     * @param email String 사용자 이메일
     * @param auth  String 권한 정보
     * @return String accessToken
     */
    public String createAccessToken(String email, String auth) {
        return createToken(email, ACCESS_TOKEN_VALID_TIME, auth);
    }

    /**
     * RefreshToken 생성
     * @param email String 사용자 이메일
     * @param auth  String 권한 정보
     * @return String refreshToken
     */
    public String createRefreshToken(String email, String auth) {
        return createToken(email, REFRESH_TOKEN_VALID_TIME, auth);
    }

    /**
     * 토큰 파싱
     * @param token String 토큰
     * @param key   byte[] 키정보
     * @return Claims 파싱 하려는 토큰의 payload 내의 Claim 정보
     */
    public Claims parseToken(String token, byte[] key) {
        return Jwts.parserBuilder()
                .setSigningKey(Base64.getEncoder().encodeToString(key))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * 토큰에서 subject 에 저장된 email 정보 추출
     * @param token String 토큰
     * @return String 토큰에서 추출한 이메일
     */
    public String getEmailFromToken(String token) {
        String email = String.valueOf(parseToken(token, key).getSubject());
        return email;
    }

    /**
     * 토큰 만료 여부
     * @param token String 토큰
     * @return boolean 토큰이 만료 되었으면 true, 만료 안되었으면 false
     */
    public boolean isTokenExpired(String token) {
        return parseToken(token, key).getExpiration().before(new Date());
    }
    
    /**
     * 토큰이 유요한지 검증 (JwtToken에 해당 유저의 키가 저장되어 있는지도 확인)
     * JwtToken 에 해당 유저의 이메일이 저장되어 있지 않은 경우는 로그아웃한 경우
     * @param token String 토큰
     * @return boolean 토큰이 유요하면 true
     * @throws InvalidTokenException 토큰 에러
     */
    public boolean validateToken(String token) throws InvalidTokenException {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);

            return true;
        } catch (SecurityException e) {
            throw new InvalidTokenException("잘못된 JWT 서명입니다.");
        } catch (UnsupportedJwtException e) {
            throw new InvalidTokenException("지원하지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException | MalformedJwtException e) {
            throw new InvalidTokenException("잘못된 JWT 토큰입니다.");
        } catch (ExpiredJwtException e){
            throw new InvalidTokenException("만료된 토큰입니다.");
        } catch (Exception e){
            throw new InvalidTokenException("유효하지 않은 토큰입니다.");
        }
    }


    /**
     * Authentication 객체 생성
     * @param token String 토큰
     * @return Authentication
     */
    public Authentication getAuthentication(String token) {
        Claims claims = parseToken(token, key);
        String email = claims.getSubject();

        Collection<GrantedAuthority> authority = new ArrayList<>();
        authority.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return claims.get("auth").toString();
            }
        });
        return new UsernamePasswordAuthenticationToken(email, "", authority);
    }

    /**
     * 토큰에 저장된 권한 정보 추출
     * @param token String 토큰
     * @return String 토큰 안에 저장된 권한 정보
     */
    public String getAuthorityFromToken(String token){
        String auth = String.valueOf(parseToken(token, key).get("auth"));
        log.info("auth : {} ", auth);
        return auth;
    }


    /**
     * JwtToken 에서 Bearer 제거
     * @param bearerToken Bearer 가 붙어 있는 토큰
     * @return Bearer 를 제거한 토큰
     */
    public String removeBearer(String bearerToken){
        
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }



}

