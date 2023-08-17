package com.ssafy.stargate.controller;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.request.history.HistoryCreateRequestDto;
import com.ssafy.stargate.model.dto.request.history.HistoryDeleteRequestDto;
import com.ssafy.stargate.model.dto.request.history.HistoryUpdateRequestDto;
import com.ssafy.stargate.model.dto.response.history.HistoryResponseDto;
import com.ssafy.stargate.model.dto.response.history.HistoryResponseDetailDto;
import com.ssafy.stargate.model.service.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 히스토리에 관한 Controller이다.
 * 히스토리는 멤버가 팬에 대한 정보를 팬미팅 시 기록하고 볼 수 있는 기능이다.
 */
@RestController
@RequestMapping("/histories")
@RequiredArgsConstructor
public class HistoryController {
    private final HistoryService historyService;

    /**
     * 멤버가 해당 유저에 대한 히스토리 정보 리스트를 가져온다.
     *
     * @param memberNo [long] 멤버 번호 (id)
     * @param email    [String] 팬유저 이메일 (id)
     * @return [List<HistoryResponseDetailDto>] 히스토리 정보 dto 리스트
     */
    @GetMapping("/get")
    ResponseEntity<List<HistoryResponseDetailDto>> getHistoryList(@RequestParam long memberNo, @RequestParam String email) {
        List<HistoryResponseDetailDto> histories = historyService.getHistoryList(memberNo, email);
        return ResponseEntity.ok(histories);
    }

    /**
     * 히스토리를 생성한다.
     *
     * @param dto [HistoryRequestCreateDto] 생성할 히스토리 정보를 담은 dto
     * @return [HistoryResponseDto] 생성된 히스토리 정보를 담은 dto
     * @throws NotFoundException 데이터가 존재하지 않음
     * @throws CRUDException     데이터 CRUD 시 오류가 생김
     */
    @PostMapping("/create")
    ResponseEntity<HistoryResponseDto> createHistory(@RequestBody HistoryCreateRequestDto dto) throws NotFoundException, CRUDException {
        HistoryResponseDto historyRequestCreateDto = historyService.createHistory(dto);
        return ResponseEntity.ok(historyRequestCreateDto);
    }

    /**
     * 히스토리를 수정한다.
     *
     * @param dto [HistoryUpdateRequestDto] 수정할 히스토리 정보를 담은 dto
     * @throws NotFoundException 데이터가 존재하지 않음
     * @throws CRUDException     데이터 CRUD 시 오류가 생김
     */
    @PutMapping("/update")
    ResponseEntity<Void> updateHistory(@RequestBody HistoryUpdateRequestDto dto) throws NotFoundException, CRUDException {
        historyService.updateHistory(dto);
        return ResponseEntity.ok(null);
    }

    /**
     * 히스토리를 삭제한다.
     *
     * @param dto [HistoryDeleteRequestDto] 삭제할 히스토리 정보를 담은 dto
     * @return 성공: 200
     * @throws NotFoundException 데이터가 존재하지 않음
     * @throws CRUDException     데이터 CRUD 시 오류가 생김
     */
    @DeleteMapping("/delete")
    ResponseEntity<Void> deleteHistory(@RequestBody HistoryDeleteRequestDto dto) throws NotFoundException, CRUDException {
        historyService.deleteHistory(dto);
        return ResponseEntity.ok(null);
    }
}
