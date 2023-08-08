package com.ssafy.stargate.model.dto.common;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

/**
 * 팬 유저 정보 담는 DTO
 * @author 김도현
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FUserDto {

    @NotBlank(message = "아이디 (이메일) 은 필수 입력사항")
    @Pattern(regexp = "^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")
    private String email;

    @NotBlank(message = "이름은 필수 입력사항")
    private String name;

    @NotBlank(message = "비밀번호는 필수 입력사항")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*])[a-zA-Z\\d!@#$%^&*]{8,}$")
    private String password;

    @Pattern(regexp = "^[a-zA-Z\\d]{3,20}$")
    private String nickname;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime birthday;

    @NotBlank(message = "전화번호는 필수 입력사항")
    @Pattern(regexp = "^\\d{3}-\\d{3,4}-\\d{4}$")
    private String phone;
}
