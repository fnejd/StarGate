package com.ssafy.stargate.controller;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.common.MeetingDto;
import com.ssafy.stargate.model.dto.response.MeetingDetailResponseDto;
import com.ssafy.stargate.model.service.MeetingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.UUID;

/**
 * 미팅 관리를 수행하는 컨트롤러
 */
@RestController
@RequestMapping("/meetings")
@RequiredArgsConstructor
@Slf4j
public class MeetingController {
    private final MeetingService meetingService;

    /**
     * 미팅의 상세정보를 가져온다.
     *
     * @param uuid      [UUID] 미팅 UUID
     * @param principal [Principal] 소속사 이메일이 포함된 객체
     * @return [ResponseEntity<MeetingDetailResponseDto>] 저장된 미팅 결과 + 맴버 미팅방 id, 팬유저 가입 여부 dto
     * @throws NotFoundException 데이터 찾기 실패 에러
     */
    @GetMapping("/get/{uuid}")
    public ResponseEntity<MeetingDetailResponseDto> getMeeting(@PathVariable UUID uuid, Principal principal) throws NotFoundException {
        MeetingDetailResponseDto meetingDetail = meetingService.getMeeting(uuid, principal);
        return ResponseEntity.ok(meetingDetail);
    }

    /**
     * 신규 미팅을 생성한다.
     *
     * @param dto       [MeetingDto] 생성할 신규 미팅 정보
     * @param imageFile [MultipartFile] 이미지 파일 (필수 아님)
     * @param principal [Principal] 소속사 이메일이 포함된 객체
     * @return [ResponseEntity<MeetingDto>] 저장된 미팅 결과 dto (성공: 200)
     * @throws CRUDException     데이터 CRUD 에러
     * @throws NotFoundException 데이터 찾기 실패 에러
     */
    @PostMapping("/create")
    public ResponseEntity<MeetingDto> createMeeting(@ModelAttribute MeetingDto dto, @RequestParam(name = "imageFile", required = false) MultipartFile imageFile, Principal principal) throws CRUDException, NotFoundException {
        MeetingDto meeting = meetingService.createMeeting(dto, imageFile, principal);
        return ResponseEntity.ok(meeting);
    }

    /**
     * 미팅 정보를 수정한다.
     *
     * @param dto       [MeetingDto] 수정할 미팅 정보
     * @param imageFile [MultipartFile] 이미지 파일 (필수 아님)
     * @param principal [Principal] 소속사 이메일이 포함된 객체
     * @return 성공: 200
     * @throws CRUDException     데이터 CRUD 에러
     * @throws NotFoundException 데이터 찾기 실패 에러
     */
    @PutMapping("/update")
    public ResponseEntity<Void> updateMeeting(@ModelAttribute MeetingDto dto, @RequestParam(name = "imageFile", required = false) MultipartFile imageFile, Principal principal) throws CRUDException, NotFoundException {
        meetingService.updateMeeting(dto, imageFile, principal);
        return ResponseEntity.ok(null);
    }

    /**
     * 미팅을 삭제한다.
     *
     * @param dto       [MeetingDto] 삭제할 미팅 정보
     * @param principal [Principal] 소속사 이메일이 포함된 객체
     * @return 성공: 200
     * @throws CRUDException     데이터 CRUD 에러
     * @throws NotFoundException 데이터 찾기 실패 에러
     */
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteMeeting(@RequestBody MeetingDto dto, Principal principal) throws CRUDException, NotFoundException {
        meetingService.deleteMeeting(dto, principal);
        return ResponseEntity.ok(null);
    }
}