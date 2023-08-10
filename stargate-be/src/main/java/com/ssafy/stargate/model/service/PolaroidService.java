package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.model.dto.request.polaroid.PolaroidWriteRequestDto;
import com.ssafy.stargate.model.dto.response.polaroid.PolaroidResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

/**
 * 폴라로이드관련 서비스 인터페이스
 */
public interface PolaroidService {
    public List<PolaroidResponseDto> getPolaroidList(UUID uuid, Principal principal);

    public void createPolaroid(PolaroidWriteRequestDto dto, MultipartFile imageFile) throws CRUDException;
}
