package com.ssafy.stargate.model.dto.response.letter;


import lombok.*;
import java.util.List;

/**
 * 편지 목록들 반환하는 dto
 */

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LetterListResponseDto {

    List<LetterResponseDto> letters;
}
