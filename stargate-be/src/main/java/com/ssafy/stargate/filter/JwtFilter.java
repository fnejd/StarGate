package com.ssafy.stargate.filter;

import com.ssafy.stargate.util.JwtTokenUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


/**
 *
 */
@Slf4j
@RequiredArgsConstructor
@Component
public class JwtFilter extends OncePerRequestFilter{

    private final JwtTokenUtil jwtTokenUtil;

    /**
     *
     * @param request
     * @param response
     * @param filterChain
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String bearerToken = request.getHeader("Authorization"); // 헤더 파싱
        String token = null;

        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            token = bearerToken.substring(7);
        }

        if (token != null && jwtTokenUtil.validateToken(token)) {

            Authentication authentication = jwtTokenUtil.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);

        }
        filterChain.doFilter(request,response);
    }

}



