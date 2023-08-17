package com.ssafy.stargate.model.dto.request.letter;

import lombok.*;

import java.util.UUID;


/**
 * 편지 작성 요청에 관한 dto
 */

@Getter
@Setter
@ToString
public class LetterWriteRequestDto {

    private long memberNo;
    private UUID uuid;
    private String contents;

}
