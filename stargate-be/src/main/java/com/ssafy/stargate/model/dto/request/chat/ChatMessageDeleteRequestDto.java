package com.ssafy.stargate.model.dto.request.chat;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 채팅 메세지 삭제 요청 dto
 */

@Getter
@Setter
@ToString
public class ChatMessageDeleteRequestDto {

    private Long no;
}
