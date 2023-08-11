package com.ssafy.stargate.model.dto.response.puser;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class PUserResponseDto {
    private String name;
    private String email;
    private String code;
}
