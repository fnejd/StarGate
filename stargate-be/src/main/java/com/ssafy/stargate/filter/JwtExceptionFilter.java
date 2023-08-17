package com.ssafy.stargate.filter;


import com.ssafy.stargate.exception.InvalidTokenException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JWT 에러 처리 filter
 */
@Slf4j
@RequiredArgsConstructor
@Component
public class JwtExceptionFilter extends OncePerRequestFilter {

    /**
     * JwtFilter 앞에 위치해서 InvalidTokenException 핸들링
     * @param request HttpServletRequest
     * @param response HttpServletResponse
     * @param filterChain
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            filterChain.doFilter(request, response);
        }catch (InvalidTokenException e){
            errorResponse(request, response, e);
        }
    }

    /**
     * InvalidTokenException 에 해당하는 메세지 전송
     * @param request HttpServletRequest
     * @param response HttpServletResponse
     * @param e
     * @throws IOException
     */
    private void errorResponse(HttpServletRequest request, HttpServletResponse response, InvalidTokenException e) throws IOException {
        response.setStatus(e.getStatus());
        response.setContentType("application/json; charset=UTF-8");
        response.getWriter().write(e.getMessage());
    }

}
