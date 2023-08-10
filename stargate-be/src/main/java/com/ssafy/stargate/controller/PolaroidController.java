package com.ssafy.stargate.controller;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.model.dto.request.polaroid.PolaroidWriteRequestDto;
import com.ssafy.stargate.model.dto.response.polaroid.PolaroidResponseDto;
import com.ssafy.stargate.model.service.PolaroidService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

/**
 * 폴라로이드에 관한 Controller이다.
 * 폴라로이드 파일을 생성하고 리스트를 가져올 수 있다.
 */
@RestController
@RequestMapping("/polaroids")
@RequiredArgsConstructor
@Slf4j
public class PolaroidController {
    private final PolaroidService polaroidService;

    /**
     * 저장된 폴라로이드 리스트를 가져온다. (전체 멤버 폴라로이드 포함)
     *
     * @param uuid      [UUID] 미팅 uuid (id)
     * @param principal [Principal] 유저 이메일이 포함된 객체
     * @return [ResponseEntity<List < PolaroidResponseDto>>] 저장된 폴라로이드 정보 dto 리스트 (성공: 200)
     */
    @GetMapping("/get")
    public ResponseEntity<List<PolaroidResponseDto>> getPolaroidList(@RequestParam("uuid") UUID uuid, Principal principal) {
        List<PolaroidResponseDto> polaroidRequestDtos = polaroidService.getPolaroidList(uuid, principal);
        return ResponseEntity.ok(polaroidRequestDtos);
    }

    /**
     * 폴라로이드 이미지를 저장한다.
     *
     * @param dto       [PolaroidWriteRequestDto] 생성할 폴라로이드 정보
     * @param imageFile [MultipartFile] 폴라로이드 이미지 파일 (필수 아님)
     * @return 성공: 200
     * @throws CRUDException 폴라로이드 생성 실패
     */
    @PostMapping("/create")
    public ResponseEntity<Void> createPolaroid(@ModelAttribute PolaroidWriteRequestDto dto, @RequestParam(name = "imageFile", required = false) MultipartFile imageFile) throws CRUDException {
        polaroidService.createPolaroid(dto, imageFile);
        return ResponseEntity.ok(null);
    }
}
