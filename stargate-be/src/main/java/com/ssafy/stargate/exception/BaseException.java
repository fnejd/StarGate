package com.ssafy.stargate.exception;

/**
 * Custom Exception의 부모 추상 클래스이다.
 * RuntmieException에 대하여 처리한다.
 * - Status: 상태 코드. 자식 클래스가 상태 코드를 직접 설정할 수 있도록 한다.
 * - Message: 메세지, Exception을 생성할 때 메세지를 설정하도록 한다.
 */
public abstract class BaseException extends RuntimeException {
    public BaseException(String message) {
        super(message);
    }

    public abstract int getStatus();

    public abstract String getMessage();
}
