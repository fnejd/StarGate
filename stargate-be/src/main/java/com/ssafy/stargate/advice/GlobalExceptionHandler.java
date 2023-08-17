package com.ssafy.stargate.advice;


import com.ssafy.stargate.exception.BaseException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 모든 Controller에서 발생한 Exception를 전역적으로 처리하는 핸들러
 * Controller까지 에러가 도달할 수 있도록 throws를 던져주어야한다
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /**
     * Custom Exception을 처리한다.
     * @param e [BaseException] Custom Exception 정보
     * @return [ResponseEntity] Custom Exception 정보 기반으로 상태 코드와 메세지를 보내줌
     */
    @ExceptionHandler(BaseException.class)
    public ResponseEntity<?> handleCustomException(BaseException e) {
        log.error(e.getMessage());
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> allException(Exception e){
        log.error(e.getMessage());
        return ResponseEntity.status(500).body(e.getMessage());
    }
}