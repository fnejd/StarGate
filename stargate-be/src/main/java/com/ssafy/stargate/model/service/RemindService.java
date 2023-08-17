package com.ssafy.stargate.model.service;

import com.ssafy.stargate.model.dto.response.remind.RemindResponseDto;

import java.security.Principal;
import java.util.UUID;

/**
 * 팬유저 팬미팅 리마인드 관련 서비스를 명시하는 인터페이스
 */
public interface RemindService {

    public RemindResponseDto getRemind(UUID uuid, Principal principal);
}
