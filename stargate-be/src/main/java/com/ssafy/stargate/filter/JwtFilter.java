package com.ssafy.stargate.filter;

import com.ssafy.stargate.util.JwtTokenUtil;
import io.jsonwebtoken.ExpiredJwtException;
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
 */
@Slf4j
@RequiredArgsConstructor
@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    /**
     * SecurityContextHolder 에 authentication 저장, 만료된 토큰이면 601 status code 전송
     * @param request
     * @param response
     * @param filterChain
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String bearerToken = request.getHeader("Authorization");
        String token = null;

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            token = bearerToken.substring(7);
        }

        try {
            if (token != null && jwtTokenUtil.validateToken(token)) {
                Authentication authentication = jwtTokenUtil.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (ExpiredJwtException jwtException) {
            log.info("[ERR] : 만료된 JWT TOKEN");
            response.setStatus(601);
            response.getWriter().write("만료된 토큰입니다");
            response.getWriter().flush();
        }
        filterChain.doFilter(request, response);
    }
}



