package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.request.readyroom.MemoWriteRequestDto;
import com.ssafy.stargate.model.dto.request.readyroom.PolaroidEnableWriteRequsetDto;
import com.ssafy.stargate.model.dto.response.readyroom.ReadyRoomResponseDto;

import java.security.Principal;
import java.util.UUID;

/**
 * 팬유저 대기방에 관련된 서비스의를 명시하는 인터페이스
 */
public interface ReadyRoomService {
    public ReadyRoomResponseDto getReadyRoomInfo(UUID uuid, Principal principal) throws NotFoundException;

    public void writeMemo(MemoWriteRequestDto dto, Principal principal) throws NotFoundException, CRUDException;

    public void writePolaroidEnable(PolaroidEnableWriteRequsetDto dto, Principal principal) throws NotFoundException, CRUDException;
}
