package com.ssafy.stargate.model.dto.response.fuser;

import lombok.*;


/**
 * 팬유저 이메일 중복 검사 응답에 관한 dto
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FUserEmailCheckResponseDto {

    private Boolean exist;
}
