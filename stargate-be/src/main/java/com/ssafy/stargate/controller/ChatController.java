package com.ssafy.stargate.controller;



import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.common.ChatMessageDto;
import com.ssafy.stargate.model.dto.request.ChattingRoomRequestDto;
import com.ssafy.stargate.model.dto.response.ChattingRoomResponseDto;
import com.ssafy.stargate.model.service.ChatService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;



@Controller
@Slf4j
@RequiredArgsConstructor
@Transactional
@RequestMapping("/chat")
@MessageMapping("/chat")
public class ChatController {

    private final ChatService chatService;


    /**
     * 새로운 채팅룸 생성
     * @param dto ChattingRoomRequestDto 채팅룸 이름 정보 담긴 dto
     * @return [ResponseEntity<ChattingRoomResponseDto>] 생성된 채팅룸 정보 담긴 dto
     */
    @PostMapping("/new-room")
    public ResponseEntity<ChattingRoomResponseDto> createNewRoom(@RequestBody ChattingRoomRequestDto dto) {
        return ResponseEntity.ok(chatService.createChattingRoom(dto));
    }

    /**
     * 채팅룸 이름 수정
     * @param dto ChattingRoomRequestDto 수정하려는 채팅룸 번호 정보 담긴 dto
     * @return [ResponseEntity<ChattingRoomResponseDto>] 수정완료된 채팅룸 정보 담긴 dto
     * @throws NotFoundException 해당하는 번호의 채팅룸이 존재하지 않을 경우 발생하는 에러
     */
    @PutMapping("/update-room")
    public ResponseEntity<ChattingRoomResponseDto> updateChatRoom(@RequestBody ChattingRoomRequestDto dto) throws NotFoundException {
        return ResponseEntity.ok(chatService.updateChattingRoom(dto));
    }


    /**
     * 생성된 모든 채팅룸 조회
     * @return  ResponseEntity<List<ChattingRoomResponseDto>> 존재하는 모든 채팅룸
     */
    @GetMapping("/rooms")
    public ResponseEntity<List<ChattingRoomResponseDto>> getAllRooms () {
        return ResponseEntity.ok(chatService.getAllChattingRoom());
    }

    /**
     * 해당하는 채팅룸에 있는 모든 메세지 조회
     * @param dto ChattingRoomRequestDto 채팅룸 번호 정보 담긴 dto
     * @return ResponseEntity<List<ChatMessageDto>> 해당 채팅룸에 있는 모든 메세지
     */
    @GetMapping("/messages")
    public ResponseEntity<List<ChatMessageDto>> getMessages (@RequestBody ChattingRoomRequestDto dto){
        return ResponseEntity.ok(chatService.getChattingMessages(dto));
    }



    /**
     * 해당하는 채팅룸에 채팅 메세지 전달 및 저장
     * @param message ChatMessageDto 메세지 정보 담긴 dto
     * @param roomNo 채팅룸 번호
     * @throws NotFoundException 메세지를 보내려는 채팅룸이 존재하지 않을 경우 발생하는 에러
     */
    @MessageMapping("/{roomNo}")  //app/chat/{roomNo}
    @SendTo("/topic/chat/{roomNo}")    // handler 에서 처리 마친 것을 topic/chat 경로로 전송
    public void message (@Payload ChatMessageDto message, @DestinationVariable(value = "roomNo") Long roomNo) throws NotFoundException{
        chatService.sendMessage(message, roomNo);
    }

    /**
     * 채팅 메세지 삭제
     * @param dto ChatMessageDto 삭제하려는 메세지 번호 담긴 dto
     * @return 성공 -> 200
     */
    @DeleteMapping("/message")
    public ResponseEntity<?> deleteMessage (@RequestBody ChatMessageDto dto){
        chatService.deleteMessage(dto);
        return ResponseEntity.ok(null);
    }

    /**
     * 채팅 메세지 수정
     * @param dto ChatMessageDto 수정하려는 메세지 정보 담긴 dto
     * @return ResponseEntity<ChatMessageDto> 수정된 메세지 정보 담긴 dto
     * @throws NotFoundException 수정하려는 메세지 번호가 존재하지 않을 때 발생하는 에러
     */
    @PutMapping("/message")
    public ResponseEntity<ChatMessageDto> updateMessage (@RequestBody ChatMessageDto dto) throws NotFoundException{
        return ResponseEntity.ok(chatService.updateMessage(dto));
    }
}
