package com.ssafy.stargate.exception;

public class InvalidTokenException extends BaseException{


    private final String message;

    public InvalidTokenException(String message){
        super(message);
        this.message = message;
    }

    @Override
    public int getStatus() {
        return 601;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
