package com.ssafy.stargate.model.dto.response.fuser;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

/**
 * 팬유저 회원 정보에 관한 응답 dto
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FUserResponseDto {

    private String email;
    private String name;
    private String password;
    private String nickname;
    private LocalDateTime birthday;
    private String phone;
}
