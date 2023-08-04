package com.ssafy.stargate.controller;



import com.ssafy.stargate.model.dto.common.MessageDto;
import com.ssafy.stargate.model.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;


@Controller
@Slf4j
@RequiredArgsConstructor
public class ChatController {

    @Autowired
    private ChatService chatService;

    // requestmapping 과 비슷
    @MessageMapping("/hello")  //app/hello
    @SendTo("/topic/chat")    // handler 에서 처리 마친 것을 topic/chat 경로로 전송
    public void message(@Payload MessageDto message){

        chatService.send(message);
    }


}