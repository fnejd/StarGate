package com.ssafy.stargate.model.service;

import com.ssafy.stargate.model.dto.common.MessageDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ChatServiceImpl implements ChatService{

    @Autowired
    private SimpMessageSendingOperations messageSendingOperations;

    @Override
    public void send(MessageDto message) {

        messageSendingOperations.convertAndSend("/topic/chat", message);
    }
}
