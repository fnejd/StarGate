package com.ssafy.stargate.handler;

import com.ssafy.stargate.exception.InvalidTokenException;
import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.nio.file.AccessDeniedException;

@Component
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {
    private final JwtTokenUtil jwtTokenUtil;
    /**
     * 메세지가 전송되기 전 jwt 토큰이 유효한지 확인
     * @param message
     * @param channel
     * @return
     */
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) throws NotFoundException, InvalidTokenException{
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

//        if(StompCommand.CONNECT.equals(accessor.getCommand())){

        String header = extractAccessor(accessor);

        if(header == null){
            throw new NotFoundException("유효하지 않은 헤더입니다.");
        }

        String token = jwtTokenUtil.removeBearer(header);

//        jwtTokenUtil.validateToken(token);

//        }
        return message;
    }

    private String extractAccessor(StompHeaderAccessor accessor){
        return accessor.getFirstNativeHeader("Authorization").toString();
    }
}

