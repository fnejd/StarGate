package com.ssafy.stargate.controller;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.request.readyroom.MemoWriteRequestDto;
import com.ssafy.stargate.model.dto.request.readyroom.PolaroidEnableWriteRequsetDto;
import com.ssafy.stargate.model.dto.response.readyroom.ReadyRoomResponseDto;
import com.ssafy.stargate.model.service.ReadyRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.UUID;

/**
 * 팬유저 대기방에 관련 Controller이다.
 */
@RestController
@RequestMapping("/readyroom")
@RequiredArgsConstructor
public class ReadyRoomController {
    private final ReadyRoomService readyRoomService;

    /**
     * 팬유저가 참가한 해당 미팅 대기방 정보를 가져온다.
     *
     * @param uuid      [UUID] 미팅 UUID
     * @param principal [Principal] 팬유저 이메일이 포함된 객체
     * @return [ResponseEntity<ReadyRoomResponseDto>] 대기방 정보를 담은 dto
     * @throws NotFoundException 데이터 찾기 실패 에러
     */
    @GetMapping("/get")
    public ResponseEntity<ReadyRoomResponseDto> getReadyRoomInfo(@RequestParam UUID uuid, Principal principal) throws NotFoundException {
        ReadyRoomResponseDto readyRoomResponseDto = readyRoomService.getReadyRoomInfo(uuid, principal);
        return ResponseEntity.ok(readyRoomResponseDto);
    }

    /**
     * 팬유저가 작성한 메모를 저장한다.
     * 메모는 한 미팅과 한 유저 당 하나씩 생성된다
     *
     * @param dto       [MemoWriteRequestDto] 메모 정보가 담긴 dto
     * @param principal [Principal] 팬유저 이메일이 포함된 객체
     * @return 성공: 200
     * @throws NotFoundException 데이터 CRUD 에러
     * @throws CRUDException     데이터 찾기 실패 에러
     */
    @PostMapping("/memo/write")
    public ResponseEntity<Void> writeMemo(@RequestBody MemoWriteRequestDto dto, Principal principal) throws NotFoundException, CRUDException {
        readyRoomService.writeMemo(dto, principal);
        return ResponseEntity.ok(null);
    }

    /**
     * 멤버별 폴라로이드 활성화 여부를 작성한다.
     *
     * @param dto       [PolaroidEnableWriteRequsetDto] 멤버별 폴라로이드 활성화 여부 정보가 담긴 dto
     * @param principal [Principal] 팬유저 이메일이 포함된 객체
     * @return 성공: 200
     * @throws NotFoundException 데이터 CRUD 에러
     * @throws CRUDException     데이터 찾기 실패 에러
     */
    @PostMapping("/polaroid-enable/write")
    public ResponseEntity<Void> writePolaroidEnable(@RequestBody PolaroidEnableWriteRequsetDto dto, Principal principal) throws NotFoundException, CRUDException {
        readyRoomService.writePolaroidEnable(dto, principal);
        return ResponseEntity.ok(null);
    }

}
