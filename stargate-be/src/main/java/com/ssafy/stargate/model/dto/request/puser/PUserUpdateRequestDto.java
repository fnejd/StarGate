package com.ssafy.stargate.model.dto.request.puser;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PUserUpdateRequestDto {
    private String email;
    private String newPassword;
    private String code;
    private String name;
    private String originalPassword;
}
