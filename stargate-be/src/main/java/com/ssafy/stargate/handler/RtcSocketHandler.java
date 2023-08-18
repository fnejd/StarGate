package com.ssafy.stargate.handler;

import com.ssafy.stargate.model.dto.response.SimpleDto;
import lombok.Synchronized;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 웹소켓의 텍스트를 핸들링하는 클래스
 */
@Slf4j
@Component
public class RtcSocketHandler extends TextWebSocketHandler {

    private static final Map<String, List<WebSocketSession>> SESSION_MAP = new ConcurrentHashMap<>();

    /**
     * 텍스트 메시지를 전달받으면 다른 유관 클라이언트들에게 방송한다.
     * 만약 자신이 일반클라이언트(팬, 연예인)인 경우 같은 방의 상대 & 모니터 세션에 전달
     * 자신이 모니터 클라이언트이면 모니터 세션에 대해서만 대답한다.
     *
     * @param session 웹소캣 세션, interceptor으로 한번 걸러진 상태
     * @param message 텍스트 메세지
     * @throws Exception 모든 예외.
     */
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String meetingPath = (String) session.getAttributes().get("meetingPath");
        log.info("@TEXT, socketId = {}, meeting path = {}", session.getId(), meetingPath);
        log.info("Message = {}", message.getPayload());
        SESSION_MAP.get(meetingPath).iterator().forEachRemaining(webSocketSession -> {
                    try {
                        if (webSocketSession != null && webSocketSession.isOpen() && !session.getId().equals(webSocketSession.getId())) {
                            webSocketSession.sendMessage(message);
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
        );
//        for (WebSocketSession webSocketSession : SESSION_MAP.get(meetingPath).iterator(). for){
//            if (webSocketSession != null && webSocketSession.isOpen() && !session.getId().equals(webSocketSession.getId())) {
//                webSocketSession.sendMessage(message);
//            }
//        }
//        // 모니터링 룸으로 중계하는 기능
//        int idx;
//        if ((idx = meetingPath.lastIndexOf('.')) != -1) {
//            String meetingUuid = meetingPath.substring(0, idx);
//            for (WebSocketSession webSocketSession : SESSION_MAP.get(meetingUuid)) {
//                if (webSocketSession.isOpen() && !session.getId().equals(webSocketSession.getId()) && ((String) webSocketSession.getAttributes().get("meetingPath")).lastIndexOf('.') == -1) {
//                    webSocketSession.sendMessage(message);
//                }
//            }
//        }
    }


    /**
     * 연결 이후를 관리한다.
     *
     * @param session 웹소캣 세션
     * @throws Exception 모든 예외는 던진다.
     */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String meetingPath = (String) session.getAttributes().get("meetingPath");
        TextMessage message = new TextMessage("{msg : 'My Socket id = " + session.getId() + "'}");
        session.sendMessage(message);
        log.info("@OPEN : meetingInfo = {}, socket id = {}", meetingPath, session.getId());
        List<WebSocketSession> sessions = SESSION_MAP.computeIfAbsent(meetingPath, k -> new ArrayList<>());
        sessions.add(session);
        log.info("@AFTER CONNECT : connected count = {}", sessions.size());
//        int idx = -1;
//        if ((idx = meetingPath.lastIndexOf('.')) != -1) {
//            String monitorRoom = meetingPath.substring(0, idx);
//            List<WebSocketSession> monitorSession = SESSION_MAP.computeIfAbsent(monitorRoom, k -> new ArrayList<>());
//            monitorSession.add(session);
//        }
        log.info("MAP CONNECT SIZE = {}", SESSION_MAP.size());
    }

    /**
     * 세션이 끊어질 때 세션 목록의 마지막 구성원이라면 SESSION_MAP에서 세션목록을 삭제한다.
     * 그 외에는 그냥 세션 목록에서 자신을 제거한다.
     *
     * @param session 세션
     * @param status  상태코드
     * @throws Exception 예외는 던진다.
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String meetingPath = (String) session.getAttributes().get("meetingPath");
        log.info("#CLOSE, meetingInfo = {}, socket ID = {}", meetingPath, session.getId());
        List<WebSocketSession> sessions = SESSION_MAP.get(meetingPath);
        if (sessions.size() == 1) {
            SESSION_MAP.remove(meetingPath);
        } else {
            sessions.remove(session);
        }
        log.info("@AFTER Disconnect : connected count = {}", sessions.size());
        log.info("MAP SIZE = {}", SESSION_MAP.size());
    }
}


