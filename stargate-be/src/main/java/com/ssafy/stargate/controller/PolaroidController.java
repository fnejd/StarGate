package com.ssafy.stargate.controller;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.model.dto.common.PolaroidDto;
import com.ssafy.stargate.model.service.PolaroidService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/polaroids")
public class PolaroidController {
    @Autowired
    private final PolaroidService polaroidService;

    /**
     * 저장된 폴라로이드 리스트를 가져온다.
     * @param uuid      [UUID] 미팅 uuid (id)
     * @param memberNo  [long] 멤버 번호 (id)
     * @param principal [Principal] 유저 이메일이 포함된 객체
     * @return [ResponseEntity<List < PolaroidDto>>] 저장된 폴라로이드 정보 dto 리스트 (성공: 200)
     */
    @GetMapping("/get")
    public ResponseEntity<List<PolaroidDto>> getPolaroidList(@RequestParam("uuid") UUID uuid, @RequestParam("memberNo") long memberNo, Principal principal) {
        List<PolaroidDto> polaroidDtos = polaroidService.getPolaroidList(uuid, memberNo, principal);
        return ResponseEntity.ok(polaroidDtos);
    }

    /**
     * 폴라로이드 이미지를 저장한다.
     * @param dto       [MeetingDto] 생성할 폴라로이드 정보
     * @param imageFile [MultipartFile] 폴라로이드 이미지 파일
     * @return 성공: 200
     * @throws CRUDException 폴라로이드 생성 실패
     */
    @PostMapping("/create")
    public ResponseEntity<Void> createPolaroid(@ModelAttribute PolaroidDto dto, @RequestParam("imageFile") MultipartFile imageFile) throws CRUDException {
        polaroidService.createPolaroid(dto, imageFile);
        return ResponseEntity.ok(null);
    }
}
