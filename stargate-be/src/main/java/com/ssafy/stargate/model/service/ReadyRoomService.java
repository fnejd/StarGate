package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.common.MemoDto;
import com.ssafy.stargate.model.dto.common.PolaroidEnableDto;
import com.ssafy.stargate.model.dto.response.ReadyRoomResponseDto;

import java.security.Principal;
import java.util.UUID;

/**
 * 팬유저 대기방에 관련된 서비스의를 명시하는 인터페이스
 */
public interface ReadyRoomService {
    public ReadyRoomResponseDto getReadyRoomInfo(UUID uuid, Principal principal) throws NotFoundException;

    public void writeMemo(MemoDto dto, Principal principal) throws NotFoundException, CRUDException;

    public void writePolaroidEnable(PolaroidEnableDto dto, Principal principal) throws NotFoundException, CRUDException;
}
