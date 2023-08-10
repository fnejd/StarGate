package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.request.history.HistoryCreateRequestDto;
import com.ssafy.stargate.model.dto.request.history.HistoryDeleteRequestDto;
import com.ssafy.stargate.model.dto.request.history.HistoryUpdateRequestDto;
import com.ssafy.stargate.model.dto.response.history.HistoryResponseDto;
import com.ssafy.stargate.model.dto.response.history.HistoryResponseDetailDto;
import com.ssafy.stargate.model.entity.History;
import com.ssafy.stargate.model.repository.FUserRepository;
import com.ssafy.stargate.model.repository.HistoryRepository;
import com.ssafy.stargate.model.repository.PMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * 히스토리 서비스 구현체
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class HistoryServiceImpl implements HistoryService {

    private final HistoryRepository historyRepository;

    private final PMemberRepository pMemberRepository;

    private final FUserRepository fUserRepository;

    /**
     * 멤버가 해당 유저에 대한 히스토리 정보 리스트를 가져온다.
     *
     * @param memberNo [long] 멤버 번호 (id)
     * @param email    [String] 팬유저 이메일 (id)
     * @return [List<HistoryResponseDetailDto>] 히스토리 정보 dto 리스트
     */
    @Override
    public List<HistoryResponseDetailDto> getHistoryList(long memberNo, String email) {
        Optional<List<History>> optionalHistories = historyRepository.findAllHistory(memberNo, email);
        List<History> histories = (optionalHistories.isPresent()) ? optionalHistories.get() : new ArrayList<>();

        return histories.stream().map(history -> HistoryResponseDetailDto.entityToDto(history)).toList();
    }

    /**
     * 히스토리를 생성한다.
     *
     * @param dto [HistoryRequestCreateDto] 생성할 히스토리 정보를 담은 dto
     * @return [HistoryResponseCreateDto] 생성된 히스토리 정보를 담은 dto
     * @throws NotFoundException 데이터가 존재하지 않음
     * @throws CRUDException     데이터 CRUD 시 오류가 생김
     */
    @Override
    public HistoryResponseDto createHistory(HistoryCreateRequestDto dto) throws NotFoundException {
        try {
            History history = History.builder()
                    .pMember(pMemberRepository.findById(dto.getMemberNo()).orElseThrow(() -> new NotFoundException("해당 멤버가 없습니다.")))
                    .fUser(fUserRepository.findById(dto.getEmail()).orElseThrow(() -> new NotFoundException("해당 유저가 없습니다.")))
                    .contents(dto.getContents())
                    .build();
            historyRepository.save(history);

            return HistoryResponseDto.entityToDto(history);
        } catch (Exception e) {
            e.printStackTrace();
            throw new CRUDException("히스토리 생성 중 오류가 발생했습니다.");
        }
    }

    /**
     * 히스토리를 수정한다.
     * @param dto [HistoryUpdateRequestDto] 수정할 히스토리 정보를 담은 dto
     * @throws NotFoundException 데이터가 존재하지 않음
     * @throws CRUDException 데이터 CRUD 시 오류가 생김
     */
    @Override
    public void updateHistory(HistoryUpdateRequestDto dto) throws NotFoundException, CRUDException {
        try {
            History history = historyRepository.findById(dto.getNo()).orElseThrow(() -> new NotFoundException("해당 히스토리가 없습니다."));
            history.setContents(dto.getContents());
            historyRepository.save(history);
        } catch (Exception e) {
            e.printStackTrace();
            throw new CRUDException("히스토리 수정 중 오류가 발생했습니다.");
        }
    }

    /**
     * 히스토리를 삭제한다.
     * @param dto [HistoryDeleteRequestDto] 삭제할 히스토리 정보를 담은 dto
     * @return 성공: 200
     * @throws NotFoundException 데이터가 존재하지 않음
     * @throws CRUDException 데이터 CRUD 시 오류가 생김
     */
    @Override
    public void deleteHistory(HistoryDeleteRequestDto dto) throws NotFoundException, CRUDException {
        try {
            History history = historyRepository.findById(dto.getNo()).orElseThrow(() -> new NotFoundException("해당 히스토리가 없습니다."));
            historyRepository.delete(history);
        } catch (Exception e) {
            e.printStackTrace();
            throw new CRUDException("히스토리 삭제 중 오류가 발생했습니다.");
        }
    }

}
