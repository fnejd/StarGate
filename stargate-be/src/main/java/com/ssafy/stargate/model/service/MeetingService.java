package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.common.MeetingDto;
import com.ssafy.stargate.model.dto.response.MeetingDetailResponseDto;

import java.security.Principal;
import java.util.UUID;

/**
 * 미팅 관련 서비스 인터페이스
 */
public interface MeetingService {
    public MeetingDetailResponseDto getMeeting(UUID uuid, Principal principal) throws NotFoundException;

    public MeetingDto createMeeting(MeetingDto dto, Principal principal) throws CRUDException, NotFoundException;

    public void updateMeeting(MeetingDto dto, Principal principal) throws CRUDException, NotFoundException;

    public void deleteMeeting(MeetingDto dto, Principal principal) throws CRUDException, NotFoundException;
}
