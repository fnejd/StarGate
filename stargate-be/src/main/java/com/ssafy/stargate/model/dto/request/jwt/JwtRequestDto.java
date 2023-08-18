package com.ssafy.stargate.model.dto.request.jwt;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class JwtRequestDto {

    private String refreshToken;
}
