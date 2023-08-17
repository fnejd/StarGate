package com.ssafy.stargate.model.dto.response.letter;


import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * 편지 정보가 담긴 응답 dto
 */

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LetterResponseDto {

    private long no;
    private String contents;
    private String email;
    private long memberNo;
    private String name;
    private UUID uuid;
    private LocalDateTime createDate;
    private LocalDateTime editDate;
}
