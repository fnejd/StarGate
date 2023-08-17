package com.ssafy.stargate.model.dto.request.fuser;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

/**
 * 팬유저 아이디 찾기 요청에 관한 dto
 */
@Getter
@Setter
@ToString
public class FUserFindIdRequestDto {

    @NotBlank(message = "이름은 필수 입력사항")
    private String name;

    @NotBlank(message = "전화번호는 필수 입력사항")
    @Pattern(regexp = "^01([0|1|6|7|8|9]?)-?([0-9]{4})-?([0-9]{4})$")
    private String phone;

}
