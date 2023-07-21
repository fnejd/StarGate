package com.ssafy.stargate.model.dto.common;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FUserDto {
    private String email;
    private String name;
    private String password;
    private String nickname;
    private LocalDateTime birthday;
}
