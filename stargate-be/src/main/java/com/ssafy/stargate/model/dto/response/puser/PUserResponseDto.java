package com.ssafy.stargate.model.dto.response.puser;

import lombok.AllArgsConstructor;
import lombok.Builder;

@Builder
@AllArgsConstructor
public class PUserResponseDto {
    private String name;
    private String email;
    private String code;
}
