package com.ssafy.stargate.model.dto.request;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

/**
 * 팬 유저 회원가입시 사용되는 DTO이다.
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FUserRegisterRequestDto {
    private String email;
    private String name;
    private String nickname;
    private String password;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime birthday;
}
