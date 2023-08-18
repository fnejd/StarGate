package com.ssafy.stargate.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


@Configuration
@EnableWebSocketMessageBroker
public class StompConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * 엔드 포인트 설정
     * @param registry
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").
                setAllowedOrigins("*").withSockJS();
    }

    /**
     * 메시지 브로커 설정
     * @param registry
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {


        // 스프링에서 제공하는 내장 브로커 사용, topic 가 붙은 메세지가 송신되었을 때 브로커가 메세지를 구독자에게 전달
        registry.enableSimpleBroker("/topic");

        // 메세지 핸들러로 라우팅 되는 prefix
        registry.setApplicationDestinationPrefixes("/app");
    }

}
