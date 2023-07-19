package com.ssafy.stargate.controller;


import com.ssafy.stargate.model.dto.response.JwtResponseDto;
import com.ssafy.stargate.model.service.JwtTokenService;
import com.ssafy.stargate.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;


/**
 * JWT 토큰 다시 생성 Controller
 * @author 김도현
 */
@RequestMapping("/jwt")
@RestController
@Slf4j
public class JwtController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private JwtTokenService jwtTokenService;

    /**
     * refreshToken 을 받아서 만료된 accessToken 반환
     * @param map HashMap<String, Object> refreshToken
     * @return ResponseEntity<JwtResponseDto> 성공: [200] JWT Response, 실패: [600]
     */
    @PostMapping("/new-access-token")
    public ResponseEntity<JwtResponseDto> createNewToken(@RequestBody HashMap<String, Object> map){

        try {
            String refreshToken = (String) map.get("refreshToken");
            return ResponseEntity.ok(jwtTokenService.create(refreshToken));
        }catch (Exception e){
            return ResponseEntity.status(600).build();
        }
    }
}
