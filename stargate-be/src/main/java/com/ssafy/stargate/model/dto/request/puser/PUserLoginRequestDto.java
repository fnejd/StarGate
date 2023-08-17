package com.ssafy.stargate.model.dto.request.puser;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PUserLoginRequestDto {
    private String email;
    private String password;
}
