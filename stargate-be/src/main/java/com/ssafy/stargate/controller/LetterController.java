package com.ssafy.stargate.controller;

import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.common.LetterDto;
import com.ssafy.stargate.model.dto.request.LetterCreateRequestDto;
import com.ssafy.stargate.model.dto.request.LetterDeleteRequestDto;
import com.ssafy.stargate.model.dto.request.LetterFindRequestDto;
import com.ssafy.stargate.model.dto.request.LetterUpdateRequestDto;
import com.ssafy.stargate.model.service.LetterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

/**
 * 편지 관리 수행하는 컨트롤러
 */
@RequestMapping("/letters")
@RestController
@Slf4j
public class LetterController {

    @Autowired
    private LetterService letterService;

    /**
     * 편지 작성
     * @param dto LetterCreateRequestDto 팬유저가 작성한 편지 정보 담는 dto
     * @return [ResponseEntity<LetterDto>] 팬유저가 작성한 편지 정보가 저장된 dto
     * @throws NotFoundException 존재하지 않는 회원, 존재하지 않는 멤버, 존재하지 않는 팬미팅 에러
     */
    @PostMapping("/create")
    public ResponseEntity<?> createLetter(@RequestBody LetterCreateRequestDto dto) throws NotFoundException {
        LetterDto letterDto = letterService.createLetter(dto);
        return ResponseEntity.ok(letterDto);
    }

    /**
     * 편지 수정
     * @param dto LetterDto 팬유저가 수정한 편지 정보 담는 dto
     * @return [ResponseEntity<LetterDto>] 팬유저가 수정한 편지 정보가 저장된 dto
     * @throws NotFoundException 존재하지 않는 편지 에러
     */
    @PutMapping("/update")
    public ResponseEntity<?> updateLetter(@RequestBody LetterUpdateRequestDto dto) throws NotFoundException{
        LetterDto letterDto = letterService.updateLetter(dto);
        return ResponseEntity.ok(letterDto);
    }

    /**
     * 편지 삭제
     * @param dto LetterDeleteRequestDto 삭제하려는 편지 번호 정보를 담는 dto
     * @return 성공 -> 200
     */
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteLetter(@RequestBody LetterDeleteRequestDto dto){
        letterService.deleteLetter(dto);
        return ResponseEntity.ok(null);
    }


    /**
     * 개별 편지 조회
     * @param no long 편지 번호
     * @return [ResponseEntity<LetterDto>] 편지 번호에 해당하는 편지 정보
     * @throws NotFoundException 존재 하지 않는 편지 에러
     */
    @GetMapping("/get/{no}")
    public ResponseEntity<?> getLetter(@PathVariable long no) throws NotFoundException{
        LetterDto letterDto = letterService.getLetter(no);
        return ResponseEntity.ok(letterDto);
    }

    /**
     * 팬미팅 별 편지 목록 조회
     * @param dto LetterFindRequestDto 편지 찾기 위한 dto
     * @return [ResponseEntity<List<LetterDto>>] 팬미팅에 해당하는 편지 목록 정보
     */
    @GetMapping("/get-meeting")
    public ResponseEntity<?> getMeetingLetter(@RequestBody LetterFindRequestDto dto){
        List<LetterDto> letterDtos = letterService.getLetterByMeeting(dto);
        return ResponseEntity.ok(letterDtos);
    }


    /**
     * 연예인 별 편지 목록 조회
     * @param dto LetterFindRequestDto 편지 찾기 위한 dto
     * @return [ResponseEntity<List<LetterDto>>] 연예인이 받은 편지 목록 정보
     */
    @GetMapping("/get-member")
    public ResponseEntity<?> getMemberLetter(@RequestBody LetterFindRequestDto dto){
        List<LetterDto> letterDtos = letterService.getLetterByMember(dto);
        return ResponseEntity.ok(letterDtos);
    }

    /**
     * 팬유저 별 작성한 편지 목록 조회
     * @param principal Principal 유저 email이 담긴 객체
     * @return [ResponseEntity<List<LetterDto>>] 팬이 작성한 편지 목록 정보
     */
    @GetMapping("/get")
    public ResponseEntity<?> getFUserLetter(Principal principal){
        List<LetterDto> letterDtos = letterService.getLetterByFUser(principal.getName());
        return ResponseEntity.ok(letterDtos);
    }
}
