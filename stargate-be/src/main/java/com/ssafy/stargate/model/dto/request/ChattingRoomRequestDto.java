package com.ssafy.stargate.model.dto.request;


import lombok.*;

/**
 * 채팅룸 (생성, 수정, 조회) 사용되는 dto
 */
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
