package com.ssafy.stargate.exception;

/**
 * request에서 받은 인풋 데이터에서 중복이 발생한 경우 던져지는 에러
 * [Status: 600]
 */
public class InputDataDuplicationException extends BaseException {
    private final String message;

    public InputDataDuplicationException(String message) {
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
