package com.ssafy.stargate.exception;

/**
 * 이메일 중복 시 발생하는 에러
 * [Status: 600]
 */
public class EmailDuplicationException extends BaseException {
    private final String message;

    public EmailDuplicationException(String message) {
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
