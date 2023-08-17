package com.ssafy.stargate.model.dto.request.letter;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;


/**
 * 팬미팅에 보내진 편지 조회 요청에 관한 dto
 */

@Getter
@Setter
@ToString
public class LetterFindByMeetingRequestDto {

    private UUID uuid;
}
