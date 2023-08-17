package com.ssafy.stargate.filter;

import com.ssafy.stargate.exception.InvalidTokenException;
import com.ssafy.stargate.util.JwtTokenUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


/**
 * Http Request 한번의 요청에 대해 한번만 실행해는 JWT 관련 필터
 *
 * @author 김도현
 */
@Slf4j
@RequiredArgsConstructor
@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;

    /**
     * SecurityContextHolder 에 authentication 저장, 유효하지 않은 토큰 이면 601 status code 전송
     *
     * @param request     HttpServletRequest
     * @param response    HttpServletResponse
     * @param filterChain
     * @throws ServletException
     * @throws IOException
     * @throws InvalidTokenException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException, InvalidTokenException {

        String token = getToken(request);
        log.info("bearer 뺸 token = {} ", token);

        if (token != null && jwtTokenUtil.validateToken(token)) {
            Authentication authentication = jwtTokenUtil.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Bearer 를 제외한 토큰 반환
     *
     * @param request HttpServletRequest
     * @return String Bearer 를 제외한 토큰
     */
    private String getToken(HttpServletRequest request) {

        String bearerToken = request.getHeader("Authorization");

        String token = jwtTokenUtil.removeBearer(bearerToken);

        return token;
    }

}




