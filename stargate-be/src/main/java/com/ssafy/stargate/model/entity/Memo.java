package com.ssafy.stargate.model.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.UUID;

@RedisHash(value = "memo", timeToLive = 24 * 60 * 60)
@Builder
@Getter
@Setter
public class Memo {
    @Id
    private String id;
    private String contents;

    public static String createId(UUID uuid, String email) {
        return uuid + ":" + email;
    }
}


