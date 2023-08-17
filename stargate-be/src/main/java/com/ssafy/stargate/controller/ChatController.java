package com.ssafy.stargate.controller;



import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.request.chat.*;
import com.ssafy.stargate.model.dto.response.chat.ChatMessageListResponseDto;
import com.ssafy.stargate.model.dto.response.chat.ChatMessageResponseDto;
import com.ssafy.stargate.model.dto.response.chat.ChattingRoomListResponseDto;
import com.ssafy.stargate.model.dto.response.chat.ChattingRoomResponseDto;
import com.ssafy.stargate.model.service.ChatService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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
public class ChatController {

    private final ChatService chatService;


    /**
     * 새로운 채팅룸 생성
     * @param dto ChattingRoomCreateRequestDto 채팅룸 이름 정보 담긴 dto
     * @return [ResponseEntity<ChattingRoomResponseDto>] 생성된 채팅룸 정보 담긴 dto
     */
    @PostMapping("/new-room")
    public ResponseEntity<ChattingRoomResponseDto> createNewRoom(@RequestBody ChattingRoomCreateRequestDto dto) {
        return ResponseEntity.ok(chatService.createChattingRoom(dto));
    }

    /**
     * 채팅룸 이름 수정
     * @param dto ChattingRoomUpdateRequestDto 수정하려는 채팅룸 번호 정보 담긴 dto
     * @return [ResponseEntity<ChattingRoomResponseDto>] 수정완료된 채팅룸 정보 담긴 dto
     * @throws NotFoundException 해당하는 번호의 채팅룸이 존재하지 않을 경우 발생하는 에러
     */
    @PutMapping("/update-room")
    public ResponseEntity<ChattingRoomResponseDto> updateChatRoom(@RequestBody ChattingRoomUpdateRequestDto dto) throws NotFoundException {
        return ResponseEntity.ok(chatService.updateChattingRoom(dto));
    }


    /**
     * 생성된 모든 채팅룸 조회
     * @return  ResponseEntity<ChattingRoomListResponseDto> 존재하는 모든 채팅룸
     */
    @GetMapping("/rooms")
    public ResponseEntity<ChattingRoomListResponseDto> getAllRooms () {
        return ResponseEntity.ok(chatService.getAllChattingRoom());
    }

    /**
     * 해당하는 채팅룸에 있는 모든 메세지 조회
     * @param roomNo Long 채팅룸 번호
     * @return ResponseEntity<ChatMessageListResponseDto> 해당 채팅룸에 있는 모든 메세지
     */
    @GetMapping("/messages/{roomNo}")
    public ResponseEntity<ChatMessageListResponseDto> getMessages (@PathVariable Long roomNo){
        return ResponseEntity.ok(chatService.getChattingMessages(roomNo));
    }




    /**
     * 해당하는 채팅룸에 채팅 메세지 전달 및 저장
     * @param message ChatMessageCreateRequestDto 메세지 정보 담긴 dto
     * @throws NotFoundException 메세지를 보내려는 채팅룸이 존재하지 않을 경우 발생하는 에러
     */
    @MessageMapping("/chat")  //app/chat
    @SendTo("/topic/chat")    // topic/chat 경로로 전송
    public void message (@Payload ChatMessageCreateRequestDto message) throws NotFoundException{

        chatService.sendMessage(message);
    }

    /**
     * 채팅 메세지 삭제
     * @param dto ChatMessageDeleteRequestDto 삭제하려는 메세지 번호 담긴 dto
     * @return 성공 -> 200
     */
    @DeleteMapping("/message")
    public ResponseEntity<?> deleteMessage (@RequestBody ChatMessageDeleteRequestDto dto){
        chatService.deleteMessage(dto);
        return ResponseEntity.ok(null);
    }

    /**
     * 채팅 메세지 수정
     * @param dto ChatMessageUpdateRequestDto 수정하려는 메세지 정보 담긴 dto
     * @return ResponseEntity<ChatMessageResponseDto> 수정된 메세지 정보 담긴 dto
     * @throws NotFoundException 수정하려는 메세지 번호가 존재하지 않을 때 발생하는 에러
     */
    @PutMapping("/message")
    public ResponseEntity<ChatMessageResponseDto> updateMessage (@RequestBody ChatMessageUpdateRequestDto dto) throws NotFoundException{
        return ResponseEntity.ok(chatService.updateMessage(dto));
    }
}
