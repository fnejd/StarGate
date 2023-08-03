package com.ssafy.stargate.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class JwtResponseDto {
    private String refreshToken;
    private String accessToken;
}
