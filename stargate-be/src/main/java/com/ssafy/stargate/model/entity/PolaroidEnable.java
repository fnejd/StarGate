package com.ssafy.stargate.model.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.UUID;

@RedisHash(value = "polaroid-enable", timeToLive = 24 * 60 * 60)
@Builder
@Getter
@Setter
public class PolaroidEnable {
    @Id
    private String id;
    private String isPolaroidEnable; // redis는 boolean 타입이 없음

    public static String createId(UUID uuid, String email, long memberNo) {
        return uuid + ":" + email + ":" + memberNo;
    }
}


