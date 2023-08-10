package com.ssafy.stargate.exception;

/**
 * 이메일 중복 시 발생하는 에러
 * [Status: 610]
 */
public class InputDataBlankException extends BaseException {
    private final String message;

    public InputDataBlankException(String message) {
        super(message);
        this.message = message;
    }

    @Override
    public int getStatus() {
        return 610;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
