package com.ssafy.stargate.model.dto.request;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

/**
 * 팬 유저 회원가입시 사용되는 DTO이다.
 * @author 남현실
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FUserLoginRequestDto {
    private String email;
    private String password;
}
