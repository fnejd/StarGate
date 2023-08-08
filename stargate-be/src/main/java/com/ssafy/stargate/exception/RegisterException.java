package com.ssafy.stargate.exception;

/**
 * 회원가입 실패 시 던지는 에러 이다.
 * [Status: 600]
 */
public class RegisterException extends BaseException {
    private final String message;

    public RegisterException(String message) {
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
