package com.ssafy.stargate.model.service;

import com.ssafy.stargate.model.dto.common.ChatMessageDto;
import com.ssafy.stargate.model.dto.request.ChattingRoomRequestDto;
import com.ssafy.stargate.model.dto.response.ChattingRoomResponseDto;

import java.util.List;

public interface ChatService {

    public ChattingRoomResponseDto createChattingRoom(ChattingRoomRequestDto dto);

    public ChattingRoomResponseDto updateChattingRoom(ChattingRoomRequestDto dto);

    public List<ChattingRoomResponseDto> getAllChattingRoom();

    public List<ChatMessageDto> getChattingMessages(ChattingRoomRequestDto dto);

    public void sendMessage(ChatMessageDto dto);

    public void deleteMessage(ChatMessageDto dto);

    public ChatMessageDto updateMessage(ChatMessageDto dto);


}
