package com.ssafy.stargate.model.dto.response;

import lombok.*;

import java.time.LocalDateTime;

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
