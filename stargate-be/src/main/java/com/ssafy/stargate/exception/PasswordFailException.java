package com.ssafy.stargate.exception;

/**
 * 비밀번호가 틀렸을 떄 던져지는 공통 예외
 * [Status : 600]
 */
public class PasswordFailException extends BaseException{
    public PasswordFailException(String message) {
        super(message);
    }

    @Override
    public int getStatus() {
        return 600;
    }

    @Override
    public String getMessage() {
        return null;
    }
}
