package com.ssafy.stargate.controller;

import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.request.letter.LetterDeleteRequestDto;
import com.ssafy.stargate.model.dto.request.letter.LetterFindByMeetingRequestDto;
import com.ssafy.stargate.model.dto.request.letter.LetterFindByMemberRequestDto;
import com.ssafy.stargate.model.dto.request.letter.LetterWriteRequestDto;
import com.ssafy.stargate.model.dto.response.letter.LetterListResponseDto;
import com.ssafy.stargate.model.dto.response.letter.LetterResponseDto;
import com.ssafy.stargate.model.service.LetterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

/**
 * 편지 관리 수행하는 컨트롤러
 */
@RestController
@RequestMapping("/letters")
@RequiredArgsConstructor
@Slf4j
public class LetterController {
    private final LetterService letterService;


    /**
     * 편지 작성, 이미 있는 편지인 경우 업데이트
     * @param principal
     * @param dto LetterWriteRequestDto 팬유저가 작성한 편지 정보 담는 dto
     * @return [ResponseEntity<LetterResponseDto>] 팬유저가 작성한 편지 정보가 저장된 dto
     * @throws NotFoundException 존재하지 않는 회원, 존재하지 않는 멤버, 존재하지 않는 팬미팅 에러
     */
    @PostMapping("/write")
    public ResponseEntity<LetterResponseDto> writeLetter(Principal principal, @RequestBody LetterWriteRequestDto dto) throws NotFoundException {
        LetterResponseDto letterDto = letterService.writeLetter(principal, dto);
        return ResponseEntity.ok(letterDto);
    }


    /**
     * 편지 삭제
     *
     * @param dto LetterDeleteRequestDto 삭제하려는 편지 번호 정보를 담는 dto
     * @return 성공 -> 200
     */
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteLetter(@RequestBody LetterDeleteRequestDto dto) {
        letterService.deleteLetter(dto);
        return ResponseEntity.ok(null);
    }


    /**
     * 개별 편지 조회
     *
     * @param no long 편지 번호
     * @return [ResponseEntity<LetterResponseDto>] 편지 번호에 해당하는 편지 정보
     * @throws NotFoundException 존재 하지 않는 편지 에러
     */
    @GetMapping("/get/{no}")
    public ResponseEntity<LetterResponseDto> getLetter(@PathVariable long no) throws NotFoundException {
        LetterResponseDto letterDto = letterService.getLetter(no);
        return ResponseEntity.ok(letterDto);
    }

    /**
     * 팬미팅 별 편지 목록 조회
     *
     * @param dto LetterFindByMeetingRequestDto 편지 찾기 위한 dto
     * @return [ResponseEntity<LetterListResponseDto>] 팬미팅에 해당하는 편지 목록 정보
     */
    @PostMapping("/get-meeting")
    public ResponseEntity<LetterListResponseDto> getMeetingLetter(@RequestBody LetterFindByMeetingRequestDto dto) {
        LetterListResponseDto letterDtos = letterService.getLetterByMeeting(dto);
        return ResponseEntity.ok(letterDtos);
    }


    /**
     * 연예인 별 편지 목록 조회
     *
     * @param dto LetterFindByMemberRequestDto 편지 찾기 위한 dto
     * @return [ResponseEntity<LetterListResponseDto>] 연예인이 받은 편지 목록 정보
     */
    @PostMapping("/get-member")
    public ResponseEntity<LetterListResponseDto> getMemberLetter(@RequestBody LetterFindByMemberRequestDto dto) {
        LetterListResponseDto letterDtos = letterService.getLetterByMember(dto);
        return ResponseEntity.ok(letterDtos);
    }

    /**
     * 팬유저 별 작성한 편지 목록 조회
     *
     * @param principal Principal 유저 email이 담긴 객체
     * @return [ResponseEntity<LetterListResponseDto>] 팬이 작성한 편지 목록 정보
     */
    @GetMapping("/get")
    public ResponseEntity<LetterListResponseDto> getFUserLetter(Principal principal) {
        LetterListResponseDto letterDtos = letterService.getLetterByFUser(principal.getName());
        return ResponseEntity.ok(letterDtos);
    }
}
