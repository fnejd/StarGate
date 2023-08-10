package com.ssafy.stargate.model.dto.request.chat;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


/**
 * 채팅 메세지 생성 요청 dto
 */

@Getter
@Setter
@ToString
public class ChatMessageCreateRequestDto {

    private Long roomNo;
    private String writer;
    private String message;

}
