package com.ssafy.stargate.model.dto.common;

import lombok.*;

import java.time.LocalDateTime;

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
