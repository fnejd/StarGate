package com.ssafy.stargate.util;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;
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
     * 토큰이 유요한지 검증
     * @param token String 토큰
     * @return boolean 토큰이 유요하면 true
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.info("[ERR] : 잘못된 JWT SIGN");
        } catch (UnsupportedJwtException e) {
            log.info("[ERR] : 지원 안되는 JWT TOKEN");
        } catch (IllegalArgumentException e) {
            log.info("[ERR] : 잘못된 JWT TOKEN");
        }
        return false;
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
        log.info(auth);
        return auth;
    }

}

