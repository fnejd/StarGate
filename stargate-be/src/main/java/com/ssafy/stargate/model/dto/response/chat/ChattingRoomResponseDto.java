package com.ssafy.stargate.model.dto.response.chat;

import lombok.*;

import java.time.LocalDateTime;

/**
 * 채팅룸 (생성, 수정, 조회) 사용되는 dto
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChattingRoomResponseDto {

    private Long roomNo;
    private String roomName;
    private LocalDateTime createDate;
    private LocalDateTime editDate;
}
