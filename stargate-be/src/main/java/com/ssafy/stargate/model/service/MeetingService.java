package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.exception.InputDataBlankException;
import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.request.meeting.MeetingCreateRequestDto;
import com.ssafy.stargate.model.dto.request.meeting.MeetingDeleteRequestDto;
import com.ssafy.stargate.model.dto.request.meeting.MeetingUpdateRequestDto;
import com.ssafy.stargate.model.dto.response.meeting.MeetingDetailResponseDto;
import com.ssafy.stargate.model.dto.response.meeting.MeetingResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.UUID;

/**
 * 미팅 관련 서비스 인터페이스
 */
public interface MeetingService {
    public MeetingDetailResponseDto getMeeting(UUID uuid, Principal principal) throws NotFoundException;

    public MeetingResponseDto createMeeting(MeetingCreateRequestDto dto, MultipartFile imageFile, Principal principal) throws CRUDException, InputDataBlankException;

    public void updateMeeting(MeetingUpdateRequestDto dto, MultipartFile imageFile, Principal principal) throws CRUDException, InputDataBlankException;

    public void deleteMeeting(MeetingDeleteRequestDto dto, Principal principal) throws CRUDException, NotFoundException;
}
