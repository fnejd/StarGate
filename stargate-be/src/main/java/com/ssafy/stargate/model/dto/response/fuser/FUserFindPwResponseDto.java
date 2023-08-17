package com.ssafy.stargate.model.dto.response.fuser;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

/**
 * 팬유저 인증번호 정보가 있는 비밀번호 찾기 응답 dto
 */

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FUserFindPwResponseDto {

    private String email;
    private String code;
}
