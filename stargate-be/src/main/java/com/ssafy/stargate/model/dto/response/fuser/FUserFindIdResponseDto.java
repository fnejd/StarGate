package com.ssafy.stargate.model.dto.response.fuser;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

/**
 * 팬유저 아이디 찾기 응답에 관한 dto
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FUserFindIdResponseDto {

    private String name;
    private String phone;
    private String email;
}
