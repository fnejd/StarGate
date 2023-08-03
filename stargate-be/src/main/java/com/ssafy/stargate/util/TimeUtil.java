package com.ssafy.stargate.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
public class TimeUtil {

    /**
     * 기준일로 부터 현재일까지 남은 초 반환해주는 메서드
     * @param date 기준 날짜 
     * @return 기준일 - 현재 시간을 초로 반환
     */
    public long getRemaingSeconds(LocalDateTime date){

        long remainingTimeMilli = date.atZone(ZoneId.of("Asia/Seoul")).toInstant().toEpochMilli() -LocalDateTime.now().atZone(ZoneId.of("Asia/Seoul")).toInstant().toEpochMilli();
        
        return TimeUnit.MILLISECONDS.toSeconds(remainingTimeMilli);
    }
}
