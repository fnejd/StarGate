package com.ssafy.stargate.model.dto.response.jwt;

import lombok.*;


/**
 * jwt accesstoken, refreshtoken 응답에 관한 dto
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class JwtResponseDto {
    private String refreshToken;
    private String accessToken;
}
