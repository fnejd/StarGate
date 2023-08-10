package com.ssafy.stargate.model.dto.request.letter;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 연예인별 보내진 편지 조회 요청에 관한 dto
 */

@Getter
@Setter
@ToString
public class LetterFindByMemberRequestDto {

    private long memberNo;
}
