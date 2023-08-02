package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.common.HistoryDto;

import java.util.List;

/**
 * 히스토리 서비스 인터페이스
 */
public interface HistoryService {
    public List<HistoryDto> getHistoryList(long memberNo, String email);

    public HistoryDto createHistory(HistoryDto dto) throws NotFoundException, CRUDException;

    public HistoryDto updateHistory(HistoryDto dto) throws NotFoundException, CRUDException;

    public void deleteHistory(HistoryDto dto) throws NotFoundException, CRUDException;
}
