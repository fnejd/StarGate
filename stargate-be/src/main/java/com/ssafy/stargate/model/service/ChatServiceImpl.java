package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.request.chat.*;
import com.ssafy.stargate.model.dto.response.chat.ChatMessageListResponseDto;
import com.ssafy.stargate.model.dto.response.chat.ChatMessageResponseDto;
import com.ssafy.stargate.model.dto.response.chat.ChattingRoomListResponseDto;
import com.ssafy.stargate.model.dto.response.chat.ChattingRoomResponseDto;
import com.ssafy.stargate.model.entity.ChatMessage;
import com.ssafy.stargate.model.entity.ChattingRoom;
import com.ssafy.stargate.model.repository.ChatMessageRepository;
import com.ssafy.stargate.model.repository.ChattingRoomRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ChatServiceImpl implements ChatService {


    private final ChattingRoomRepository chattingRoomRepository;

    private final ChatMessageRepository chatMessageRepository;

    /**
     * 채팅룸 생성
     *
     * @param dto ChattingRoomRequestDto 채팅룸 이름이 담긴 dto
     * @return ChattingRoomResponseDto 생성된 채팅룸 정보
     */
    @Override
    public ChattingRoomResponseDto createChattingRoom(ChattingRoomCreateRequestDto dto) {

        ChattingRoom chattingRoom = ChattingRoom.builder()
                .name(dto.getRoomName())
                .build();

        ChattingRoom savedChattingRoom = chattingRoomRepository.save(chattingRoom);

        return ChattingRoomResponseDto.builder()
                .roomNo(savedChattingRoom.getRoomNo())
                .roomName(savedChattingRoom.getName())
                .createDate(savedChattingRoom.getCreateDate())
                .build();
    }

    /**
     * 채팅룸 업데이트 (채팅룸 이름 업데이트)
     *
     * @param dto ChattingRoomUpdateRequestDto 채팅룸 정보
     * @return ChattingRoomResponseDto 채팅룸 수정된 dto
     */
    @Override
    public ChattingRoomResponseDto updateChattingRoom(ChattingRoomUpdateRequestDto dto) throws NotFoundException {

        ChattingRoom chattingRoom = chattingRoomRepository.findById(dto.getRoomNo()).orElseThrow(() -> new NotFoundException("해당하는 채팅룸은 존재하지 않습니다"));

        chattingRoom.setName(dto.getRoomName());

        ChattingRoom savedChattingRoom = chattingRoomRepository.save(chattingRoom);

        return ChattingRoomResponseDto.builder()
                .roomNo(savedChattingRoom.getRoomNo())
                .roomName(savedChattingRoom.getName())
                .createDate(savedChattingRoom.getCreateDate())
                .editDate(savedChattingRoom.getEditDate())
                .build();
    }

    /**
     * 저장되어 있는 모든 채팅룸 조회
     *
     * @return ChattingRoomListResponseDto 채팅룸 정보 저장되어 있는 dto
     */
    @Override
    public ChattingRoomListResponseDto getAllChattingRoom() {

        List<ChattingRoom> chattingRoomList = chattingRoomRepository.findAll();

        return ChattingRoomListResponseDto.builder()
                .chattingRooms(chattingRoomList.stream().map((chattingRoom -> ChattingRoomResponseDto.builder()
                                .roomNo(chattingRoom.getRoomNo())
                                .roomName(chattingRoom.getName())
                                .createDate(chattingRoom.getCreateDate())
                                .editDate(chattingRoom.getEditDate())
                                .build()))
                        .toList())
                .build();
    }


    /**
     * 채팅룸에 존재하는 모든 채팅 메세지 정보 조회
     *
     * @param roomNo Long 채팅룸 번호
     * @return ChatMessageListResponseDto 해당 채팅룸 번호에 존재하는 모든 채팅 메세지가 담긴 dto
     */
    @Override
    public ChatMessageListResponseDto getChattingMessages(Long roomNo) {

        List<ChatMessage> chatMessageList = chatMessageRepository.findAllByChattingRoomRoomNo(roomNo).orElse(null);

        return ChatMessageListResponseDto.builder()
                .chatMessages(chatMessageList.stream().map((chatMessage -> ChatMessageResponseDto.builder()
                                .no(chatMessage.getNo())
                                .roomNo(chatMessage.getChattingRoom().getRoomNo())
                                .writer(chatMessage.getNickname() != null ? chatMessage.getNickname() : chatMessage.getEmail())
                                .message(chatMessage.getMessage())
                                .createDate(chatMessage.getCreateDate())
                                .editDate(chatMessage.getEditDate())
                                .build()))
                        .toList())
                .build();

    }


    /**
     * 메세지 해당 채팅룸에 전송 및 전송된 메세지 저장
     *
     * @param message ChatMessageCreateRequestDto 작성된 메세지가 저장된 dto
     * @throws NotFoundException 메세지를 보내려는 채팅룸이 존재하지 않을 경우 발생하는 에러
     */
    @Override
    public void sendMessage(ChatMessageCreateRequestDto message) throws NotFoundException {

        ChattingRoom chattingRoom = chattingRoomRepository.findById(message.getRoomNo()).orElseThrow(() -> new NotFoundException("해당하는 채팅룸은 존재하지 않습니다"));

        ChatMessage.ChatMessageBuilder chatMessage = ChatMessage.builder()
                .chattingRoom(chattingRoom)
                .message(message.getMessage());

        if (message.getWriter().contains("@")) {
            chatMessage.email(message.getWriter());
        } else {
            chatMessage.nickname(message.getWriter());
        }

        chatMessageRepository.save(chatMessage.build());
    }

    /**
     * 채팅 메세지 삭제
     *
     * @param dto ChatMessageDeleteRequestDto 삭제하려는 메세지 정보가 담긴 dto
     */

    @Override
    public void deleteMessage(ChatMessageDeleteRequestDto dto) {
        chatMessageRepository.deleteById(dto.getNo());
    }


    /**
     * 채팅 메세지 수정
     *
     * @param dto ChatMessageUpdateRequestDto 수정하려는 메세지 정보가 담긴 dto
     * @return ChatMessageResponseDto 수정된 메세지 정보가 담긴 dto
     * @throws NotFoundException 수정하려는 메세지 번호가 존재하지 않을 때 발생하는 에러
     */
    @Override
    public ChatMessageResponseDto updateMessage(ChatMessageUpdateRequestDto dto) throws NotFoundException {
        ChatMessage chatMessage = chatMessageRepository.findById(dto.getNo()).orElseThrow(() -> new NotFoundException("해당 하는 메세지가 존재하지 않습니다."));

        chatMessage.setMessage(dto.getMessage());

        ChatMessage savedChatMessage = chatMessageRepository.save(chatMessage);

        return ChatMessageResponseDto.builder()
                .no(savedChatMessage.getNo())
                .roomNo(savedChatMessage.getChattingRoom().getRoomNo())
                .message(savedChatMessage.getMessage())
                .writer(savedChatMessage.getNickname() != null ? savedChatMessage.getNickname() : savedChatMessage.getEmail())
                .createDate(savedChatMessage.getCreateDate())
                .editDate(savedChatMessage.getEditDate())
                .build();
    }
}
