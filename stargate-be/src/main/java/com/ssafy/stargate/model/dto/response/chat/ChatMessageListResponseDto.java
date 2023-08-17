package com.ssafy.stargate.model.dto.response.chat;


import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatMessageListResponseDto {

    List<ChatMessageResponseDto> chatMessages;
}
