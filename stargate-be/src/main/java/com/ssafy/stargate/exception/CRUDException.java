package com.ssafy.stargate.exception;

/**
 * 데이터베이스 CRUD 기능 실패 시 던지는 에러이다.
 * [Status: 600]
 */
public class CRUDException extends BaseException {
    private final String message;

    public CRUDException(String message) {
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
