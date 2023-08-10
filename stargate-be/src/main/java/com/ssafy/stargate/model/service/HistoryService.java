package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.request.history.HistoryCreateRequestDto;
import com.ssafy.stargate.model.dto.request.history.HistoryDeleteRequestDto;
import com.ssafy.stargate.model.dto.request.history.HistoryUpdateRequestDto;
import com.ssafy.stargate.model.dto.response.history.HistoryResponseDto;
import com.ssafy.stargate.model.dto.response.history.HistoryResponseDetailDto;

import java.util.List;

/**
 * 히스토리 서비스 인터페이스
 */
public interface HistoryService {
    public List<HistoryResponseDetailDto> getHistoryList(long memberNo, String email);

    public HistoryResponseDto createHistory(HistoryCreateRequestDto dto) throws NotFoundException, CRUDException;

    public void updateHistory(HistoryUpdateRequestDto dto) throws NotFoundException, CRUDException;

    public void deleteHistory(HistoryDeleteRequestDto dto) throws NotFoundException, CRUDException;
}
