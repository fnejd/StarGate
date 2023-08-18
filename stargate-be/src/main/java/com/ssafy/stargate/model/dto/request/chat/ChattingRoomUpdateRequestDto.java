package com.ssafy.stargate.model.dto.request.chat;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 채팅룸 수정 요청에 관한 dto
 */

@Getter
@Setter
@ToString
public class ChattingRoomUpdateRequestDto {
    private Long roomNo;
    private String roomName;
}
