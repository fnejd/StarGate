package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.common.ChatMessageDto;
import com.ssafy.stargate.model.dto.request.ChattingRoomRequestDto;
import com.ssafy.stargate.model.dto.response.ChattingRoomResponseDto;
import com.ssafy.stargate.model.entity.ChatMessage;
import com.ssafy.stargate.model.entity.ChattingRoom;
import com.ssafy.stargate.model.repository.ChatMessageRepository;
import com.ssafy.stargate.model.repository.ChattingRoomRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ChatServiceImpl implements ChatService{

    private final SimpMessageSendingOperations messageSendingOperations;

    private final ChattingRoomRepository chattingRoomRepository;

    private final ChatMessageRepository chatMessageRepository;

    /**
     * 채팅룸 생성
     * @param dto ChattingRoomRequestDto 채팅룸 이름이 담긴 dto
     * @return ChattingRoomResponseDto 생성된 채팅룸 정보
     */
    @Override
    public ChattingRoomResponseDto createChattingRoom(ChattingRoomRequestDto dto) {

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
     * @param dto ChattingRoomRequestDto 채팅룸 정보
     * @return ChattingRoomResponseDto 채팅룸 수정된 dto
     */
    @Override
    public ChattingRoomResponseDto updateChattingRoom(ChattingRoomRequestDto dto) throws NotFoundException{

        ChattingRoom chattingRoom = chattingRoomRepository.findById(dto.getRoomNo()).orElseThrow(()-> new NotFoundException("해당하는 채팅룸은 존재하지 않습니다"));

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
     * @return ChattingRoomResponseDto 채팅룸 정보 저장되어 있는 dto
     */
    @Override
    public List<ChattingRoomResponseDto> getAllChattingRoom() {

        List<ChattingRoom> chattingRoomList = chattingRoomRepository.findAll();

        return chattingRoomList.stream().map((chattingRoom -> ChattingRoomResponseDto.builder()
                .roomNo(chattingRoom.getRoomNo())
                .roomName(chattingRoom.getName())
                .createDate(chattingRoom.getCreateDate())
                .editDate(chattingRoom.getEditDate())
                .build()))
                .toList();
    }


    /**
     * 채팅룸에 존재하는 모든 채팅 메세지 정보 조회
     * @param dto ChattingRoomRequestDto 채팅룸 정보가 담긴 dto
     * @return List<ChatMessageDto> 해당 채팅룸 번호에 존재하는 모든 채팅 메세지가 담긴 dto
     */
    @Override
    public List<ChatMessageDto> getChattingMessages(ChattingRoomRequestDto dto) {

        List<ChatMessage> chatMessageList = chatMessageRepository.findAllByChattingRoomRoomNo(dto.getRoomNo()).orElse(null);

        return chatMessageList.stream().map((chatMessage -> ChatMessageDto.builder()
                .no(chatMessage.getNo())
                .roomNo(chatMessage.getChattingRoom().getRoomNo())
                .writer(chatMessage.getNickname() != null ? chatMessage.getNickname() : chatMessage.getEmail())
                .message(chatMessage.getMessage())
                .createDate(chatMessage.getCreateDate())
                .editDate(chatMessage.getEditDate())
                .build()))
                .toList();
                
    }


    /**
     * 메세지 해당 채팅룸에 전송 및 전송된 메세지 저장
     * @param message ChatMessageDto 작성된 메세지가 저장된 dto
     * @param roomNo 채팅룸 번호
     * @throws NotFoundException 메세지를 보내려는 채팅룸이 존재하지 않을 경우 발생하는 에러
     */
    @Override
    public void sendMessage(ChatMessageDto message, Long roomNo) throws NotFoundException {

        messageSendingOperations.convertAndSend("/topic/chat" + message.getRoomNo(), message);

        ChattingRoom chattingRoom = chattingRoomRepository.findById(roomNo).orElseThrow(() -> new NotFoundException("해당하는 채팅룸은 존재하지 않습니다"));

        ChatMessage.ChatMessageBuilder chatMessage = ChatMessage.builder()
                .no(message.getNo())
                .chattingRoom(chattingRoom)
                .message(message.getMessage());

        if(message.getWriter().contains("@")){
            chatMessage.email(message.getWriter());
        }else{
            chatMessage.nickname(message.getWriter());
        }

        chatMessageRepository.save(chatMessage.build());
    }

    /**
     * 채팅 메세지 삭제
     * @param dto ChatMessageDto 삭제하려는 메세지 정보가 담긴 dto
     */

    @Override
    public void deleteMessage(ChatMessageDto dto) {
        chatMessageRepository.deleteById(dto.getNo());
    }



    /**
     * 채팅 메세지 수정
     * @param dto ChatMessageDto 수정하려는 메세지 정보가 담긴 dto
     * @return ChatMessageDto 수정된 메세지 정보가 담긴 dto
     * @throws NotFoundException 수정하려는 메세지 번호가 존재하지 않을 때 발생하는 에러
     */
    @Override
    public ChatMessageDto updateMessage(ChatMessageDto dto) throws NotFoundException {
        ChatMessage chatMessage = chatMessageRepository.findById(dto.getNo()).orElseThrow(() -> new NotFoundException("해당 하는 메세지가 존재하지 않습니다."));

        chatMessage.setMessage(dto.getMessage());

        ChatMessage savedChatMessage = chatMessageRepository.save(chatMessage);

        return ChatMessageDto.builder()
                .no(savedChatMessage.getNo())
                .roomNo(savedChatMessage.getChattingRoom().getRoomNo())
                .message(savedChatMessage.getMessage())
                .writer(savedChatMessage.getNickname() != null ? savedChatMessage.getNickname() : savedChatMessage.getEmail())
                .createDate(savedChatMessage.getCreateDate())
                .editDate(savedChatMessage.getEditDate())
                .build();
    }
}
