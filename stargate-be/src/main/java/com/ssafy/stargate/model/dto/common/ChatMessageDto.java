package com.ssafy.stargate.model.dto.common;

import lombok.*;

import java.time.LocalDateTime;

/**
 * 메세지 전달, 저장에 사용되는 dto
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatMessageDto {

    private Long roomNo;
    private String writer;
    private String message;
    private Long no;
    private LocalDateTime createDate;
    private LocalDateTime editDate;
}
