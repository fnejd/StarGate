package com.ssafy.stargate.exception;

/**
 * 로그인 실패시 던지는 예외.
 * 모든 로그인 실패 경우에 사용한다.
 */
public class LoginException extends Exception{
    public LoginException() {
    }

    public LoginException(String message) {
        super(message);
    }

    public LoginException(String message, Throwable cause) {
        super(message, cause);
    }

    public LoginException(Throwable cause) {
        super(cause);
    }
}
