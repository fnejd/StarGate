package com.ssafy.stargate.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

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
     * @param session 웹소캣 세션, interceptor으로 한번 걸러진 상태
     * @param message 텍스트 메세지
     * @throws Exception 모든 예외.
     */
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String meetingPath = (String) session.getAttributes().get("meetingPath");
        log.info("@RtcSocketHandler, meetingInfo = {}", meetingPath);
        log.info("Message = {}", message);
        for (WebSocketSession webSocketSession : SESSION_MAP.get(meetingPath)) {
            if (webSocketSession.isOpen() && !session.getId().equals(webSocketSession.getId())) {
                webSocketSession.sendMessage(message);
            }
        }
        int idx;
        if ((idx = meetingPath.lastIndexOf('.')) != -1) {
            String meetingUuid = meetingPath.substring(0, idx);
            for (WebSocketSession webSocketSession : SESSION_MAP.get(meetingUuid)) {
                if (webSocketSession.isOpen() && !session.getId().equals(webSocketSession.getId()) && ((String) webSocketSession.getAttributes().get("meetingPath")).lastIndexOf('.') == -1) {
                    webSocketSession.sendMessage(message);
                }
            }

        }
    }

    /**
     * 연결이 형성될 경우 주소형식(구분자 . 의 유무)에 따라서 모니터링, 일반 클라이언트 세션 리스트에 등재한다.
     * @param session 웹소캣 세션
     * @throws Exception 모든 예외는 던진다.
     */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String meetingPath = (String) session.getAttributes().get("meetingPath");
        TextMessage message  = new TextMessage("My Socket id = "+session.getId());
        session.sendMessage(message);
        log.info("@RtcSocketHandler, meetingInfo = {}", meetingPath);
        List<WebSocketSession> sessions = SESSION_MAP.computeIfAbsent(meetingPath, k -> new ArrayList<>());
        sessions.add(session);
        int idx = -1;
        if ((idx = meetingPath.lastIndexOf('.')) != -1) {
            String monitorRoom = meetingPath.substring(0, idx);
            List<WebSocketSession> monitorSession = SESSION_MAP.computeIfAbsent(monitorRoom, k -> new ArrayList<>());
            monitorSession.add(session);
        }
        log.info("MAP CONNECT SIZE = {}",SESSION_MAP.size());
    }

    /**
     * 세션이 끊어질 때 세션 목록의 마지막 구성원이라면 SESSION_MAP에서 세션목록을 삭제한다.
     * 그 외에는 그냥 세션 목록에서 자신을 제거한다.
     * @param session 세션
     * @param status 상태코드
     * @throws Exception 예외는 던진다.
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String meetingPath = (String) session.getAttributes().get("meetingPath");
        log.info("@CONNECTION CLOSE, meetingInfo = {}", meetingPath);
        List<WebSocketSession> meetingSessionList = SESSION_MAP.get(meetingPath);
        if (meetingSessionList.size() == 1) {
            SESSION_MAP.remove(meetingPath);
        } else {
            meetingSessionList.remove(session);
        }

        int idx;
        if ((idx = meetingPath.lastIndexOf('.')) != -1) {
            String monitorPath = meetingPath.substring(0, idx);
            List<WebSocketSession> monitorSessionList = SESSION_MAP.get(monitorPath);
            if (monitorSessionList.size() == 1) {
                SESSION_MAP.remove(monitorPath);
            } else {
                monitorSessionList.remove(session);
            }
        }
        log.info("MAP SIZE = {}",SESSION_MAP.size());
    }

}
