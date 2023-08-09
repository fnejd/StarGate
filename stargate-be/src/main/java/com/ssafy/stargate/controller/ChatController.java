package com.ssafy.stargate.controller;


import com.ssafy.stargate.model.dto.common.ChatMessageDto;
import com.ssafy.stargate.model.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    // requestmapping 과 비슷
    @MessageMapping("/chat/{roomNo}")  //app/hello
    @SendTo("/topic/chat/{roomNo}")    // handler 에서 처리 마친 것을 topic/chat 경로로 전송
    public void message(@Payload ChatMessageDto message, @DestinationVariable(value = "roomNo") Long roomNo) {
        chatService.sendMessage(message);
    }


}