package com.ssafy.stargate.config;

import com.ssafy.stargate.handler.RtcSocketHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

/**
 * 웹소켓과 관련된 설정을 수행한다.
 */
@Slf4j
@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    private final RtcSocketHandler rtcSocketHandler;

    /**
     * 웹소켓의 경로를 등록한다.
     *
     * @param registry 웹소캣 핸들러 레지스트리(기본값)
     */
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(rtcSocketHandler, "/rtc/*")
                .setAllowedOrigins("*")
                .addInterceptors(meetingInterceptor());
    }

    /**
     * 경로에서 미팅방 정보 및 연결 연예인 번호를 추적한다.
     * src : https://stackoverflow.com/questions/49378759/path-parameters-in-websocketconfigurer-addhandler-in-spring
     *
     * @return HandshakeInterceptor 객체
     */
    @Bean
    public HandshakeInterceptor meetingInterceptor() {
        return new HandshakeInterceptor() {
            public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                           WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {

                // Get the URI segment corresponding to the auction id during handshake
                String path = request.getURI().getPath();
                String meetingPath = path.substring(path.lastIndexOf('/') + 1);
                log.info("SOCKET : 연결된 meeting UUID = {}", meetingPath);
                // This will be added to the websocket session
                attributes.put("meetingPath", meetingPath);
                return true;
            }

            public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                       WebSocketHandler wsHandler, Exception exception) {
                // Nothing to do after handshake
            }
        };
    }

}
