package com.ssafy.stargate.exception;

/**
 * 데이터베이스 저장 실패 시 던지는 에러이다.
 * [Status: 600]
 */
public class SaveException extends BaseException {
    private final String message;

    public SaveException(String message) {
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
