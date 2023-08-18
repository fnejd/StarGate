package com.ssafy.stargate.model.dto.request.puser;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PUserCreateRequestDto {
    private String email;
    private String password;
    private String code;
    private String name;
}
