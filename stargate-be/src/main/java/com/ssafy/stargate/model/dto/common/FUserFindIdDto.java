package com.ssafy.stargate.model.dto.common;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

/**
 * 아이디 찾기를 위한 DTO
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FUserFindIdDto {

    @NotBlank(message = "이름은 필수 입력사항")
    private String name;

    @NotBlank(message = "전화번호는 필수 입력사항")
    @Pattern(regexp = "^01([0|1|6|7|8|9]?)-?([0-9]{4})-?([0-9]{4})$")
    private String phone;

    private String email;
}
