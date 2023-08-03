package com.ssafy.stargate.exception;

/**
 * 찾고자하는 데이터가 없을 때 던져지는 예외
 */
public class NotFoundException extends BaseException {
    private final String message;

    public NotFoundException(String message) {
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
