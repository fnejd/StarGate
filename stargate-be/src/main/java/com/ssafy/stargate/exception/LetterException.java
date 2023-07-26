package com.ssafy.stargate.exception;

/**
 * 편지 서비스 관련 에러
 */
public class LetterException extends BaseException {

    private final String message;

    public LetterException(String message){
        super(message);
        this.message = message;
    }


    @Override
    public int getStatus() {
        return 600;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
