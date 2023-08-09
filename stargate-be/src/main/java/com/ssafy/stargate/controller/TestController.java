package com.ssafy.stargate.controller;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.handler.FileHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@RestController
@RequestMapping("/tests")
@RequiredArgsConstructor
@Slf4j
public class TestController {
    private final FileHandler fileHandler;

    private final String filePath = "test";

    @GetMapping("/get-test")
    public ResponseEntity<?> getTest() {
        log.info("TEST FOR GET IS WORKING");
        return ResponseEntity.ok("HELP");
    }

    @GetMapping("/jwt-auth")
    public ResponseEntity<?> getJwtAuth(Principal principal) {
        log.info("JWT 파싱 테스트 : {}", principal.getName());
        return ResponseEntity.ok(null);
    }

    @GetMapping("/jwt-expired")
    public ResponseEntity<?> getJwtExpired(Principal principal) {
        log.info("JWT 만료 status 테스트");
        return ResponseEntity.ok(null);
    }


    @GetMapping("/multipart/s3/get-url")
    public ResponseEntity<?> getUrlMultipartS3(@RequestParam("filename") String filename) throws CRUDException, NotFoundException {
        String key = fileHandler.getKey(filePath, filename);
        return ResponseEntity.ok(fileHandler.getFileInfo(key));
    }

    @PostMapping("/multipart/s3/upload")
    public ResponseEntity<?> uploadMultipartS3(@RequestParam("file") MultipartFile file) throws CRUDException {
        String key = fileHandler.getKey(filePath, fileHandler.getUuidFilename(file.getOriginalFilename()));
        fileHandler.uploadFile(key, file);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/multipart/s3/delete")
    public ResponseEntity<?> deleteMultipartS3(@RequestParam("filename") String filename) throws CRUDException, NotFoundException {
        String key = fileHandler.getKey(filePath, filename);
        fileHandler.deleteFile(key);
        return ResponseEntity.ok(null);
    }

}
