package com.ssafy.stargate.model.dto.response.chat;


import lombok.*;

import java.time.LocalDateTime;

/**
 * 메세지 정보가 담긴 응답 dto
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatMessageResponseDto {

    private Long roomNo;
    private String writer;
    private String message;
    private Long no;
    private LocalDateTime createDate;
    private LocalDateTime editDate;
}


