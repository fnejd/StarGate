package com.ssafy.stargate.model.dto.response.chat;


import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChattingRoomListResponseDto {

    List<ChattingRoomResponseDto> chattingRooms;
}
