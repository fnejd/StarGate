package com.ssafy.stargate.model.dto.request;


import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChattingRoomRequestDto {

    private Long roomNo;
    private String roomName;
}
