package com.ssafy.stargate.model.service;


import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.request.chat.*;
import com.ssafy.stargate.model.dto.response.chat.ChatMessageListResponseDto;
import com.ssafy.stargate.model.dto.response.chat.ChatMessageResponseDto;
import com.ssafy.stargate.model.dto.response.chat.ChattingRoomListResponseDto;
import com.ssafy.stargate.model.dto.response.chat.ChattingRoomResponseDto;

public interface ChatService {

    public ChattingRoomResponseDto createChattingRoom(ChattingRoomCreateRequestDto dto);

    public ChattingRoomResponseDto updateChattingRoom(ChattingRoomUpdateRequestDto dto) throws NotFoundException;


    public ChattingRoomListResponseDto getAllChattingRoom();

    public ChatMessageListResponseDto getChattingMessages(Long roomNo);

    public void sendMessage(ChatMessageCreateRequestDto dto) throws NotFoundException;

    public void deleteMessage(ChatMessageDeleteRequestDto dto);

    public ChatMessageResponseDto updateMessage(ChatMessageUpdateRequestDto dto) throws NotFoundException;


}
