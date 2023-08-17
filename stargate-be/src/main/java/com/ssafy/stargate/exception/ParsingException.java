package com.ssafy.stargate.exception;

/**
 * 파싱 실패 시 던지는 에러이다.
 * [Status: 600]
 */
public class ParsingException extends BaseException {
    private final String message;

    public ParsingException(String message) {
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
