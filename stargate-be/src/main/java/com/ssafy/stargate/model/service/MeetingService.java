package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.SaveException;
import com.ssafy.stargate.model.dto.common.MeetingDto;

import java.security.Principal;

/**
 * 미팅 관련 서비스 인터페이스
 */
public interface MeetingService {
    public MeetingDto create(MeetingDto dto, Principal principal) throws SaveException;
}
