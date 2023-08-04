package com.ssafy.stargate.model.service;

import com.ssafy.stargate.model.dto.common.MessageDto;

public interface ChatService {

    public void send(MessageDto message);
}
