package com.ssafy.stargate.model.dto.request;

import lombok.*;

/**
 * 소속사 유저 회원가입시 request에 사용되는 dto이다
 * @author 백승윤
 */

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PUserDto {
    private String email;
    private String password;
    private String code;
    private String name;
}
