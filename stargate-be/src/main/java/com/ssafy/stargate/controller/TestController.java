package com.ssafy.stargate.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/tests")
@RestController
@Slf4j
public class TestController {
    @GetMapping("/get-test")
    public ResponseEntity<?> getTest(){
      log.info("TEST FOR GET IS WORKING");
      return ResponseEntity.ok("HELP");
    }

}
