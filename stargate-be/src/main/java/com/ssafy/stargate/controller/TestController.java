package com.ssafy.stargate.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RequestMapping("/tests")
@RestController
@Slf4j
public class TestController {
    @GetMapping("/get-test")
    public ResponseEntity<?> getTest(){
      log.info("TEST FOR GET IS WORKING");
      return ResponseEntity.ok("HELP");
    }

    @GetMapping("/jwt-auth")
    public ResponseEntity<?> getJwtAuth(Principal principal){
        log.info("JWT 파싱 테스트 : {}",principal.getName());
        return ResponseEntity.ok(null);
    }

    @GetMapping("/jwt-expired")
    public ResponseEntity<?> getJwtExpired(Principal principal){
        log.info("JWT 만료 status 테스트");
        return ResponseEntity.ok(null);
    }


}
