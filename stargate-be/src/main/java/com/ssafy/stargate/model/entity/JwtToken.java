package com.ssafy.stargate.model.entity;


import org.springframework.data.annotation.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.redis.core.RedisHash;

/**
 * refreshToken 을 redis 에 저장하기 위한 entity
 */
@RedisHash(value = "token", timeToLive = 14 * 24 * 60 * 60)
@Builder
@Getter
@Setter
public class JwtToken {

    @Id
    private String email;
    private String refreshToken;
}
