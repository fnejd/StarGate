package com.ssafy.stargate.exception;

/**
 * 로그인 실패 시 던지는 에러
 * 모든 로그인 실패 경우에 사용한다.
 * [Status: 401]
 */
public class LoginException extends BaseException {
    private final String message;

    public LoginException(String message) {
        super(message);
        this.message = message;
    }

    @Override
    public int getStatus() {
        return 401;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
