package com.ssafy.stargate.model.dto.request.fuser;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

/**
 * 팬유저 인증 번호 일치 확인 요청에 관한 dto
 */

@Getter
@Setter
@ToString
public class FUserCheckCodeRequestDto {

    @NotBlank(message = "아이디 (이메일) 은 필수 입력사항")
    @Pattern(regexp = "^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")
    private String email;

    @NotBlank(message = "인증번호는 숫자 6글자")
    @Pattern(regexp = "^\\d{6}$")
    private String code;
}
