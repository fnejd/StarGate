package com.ssafy.stargate.controller;

import com.ssafy.stargate.exception.RegisterException;
import com.ssafy.stargate.model.dto.PUserRegisterRequestDto;
import com.ssafy.stargate.model.service.PUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/pusers")
@RestController
@Slf4j
public class PUserController {

    @Autowired
    PUserService pUserService;

    @PostMapping("/register")
    public ResponseEntity<?> createPUser(@ModelAttribute PUserRegisterRequestDto dto){
        try{
            pUserService.register(dto);
            return ResponseEntity.ok(null);
        }catch (RegisterException e){
            return  ResponseEntity.status(600).build();
        }
    }

}
