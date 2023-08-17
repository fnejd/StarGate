package com.ssafy.stargate.controller;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.model.dto.request.postit.PostitDeleteRequestDto;
import com.ssafy.stargate.model.dto.request.postit.PostitRequestDto;
import com.ssafy.stargate.model.dto.request.postit.PostitWriteRequestDto;
import com.ssafy.stargate.model.dto.response.postit.PostitResponseDto;
import com.ssafy.stargate.model.service.PostitService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/postit")
@RequiredArgsConstructor
@Slf4j
public class PostitController {
    private final PostitService postitService;

    /**
     * 포스트잇을 작성한다.
     * 이는 기존 포스트잇이 없으면 신규 생성, 기존 포스트잇이 있으면 수정을 수행하도록 한다.
     *
     * @param postitDto PostitWriteRequestDto 포스트잇 정보가 담긴 dto, fUser.email, meeting.uuid, pMember.memberNo, contents 포함
     * @return 작성(생성, 수정)성공여부를 반환.
     */
    @PostMapping("/write")
    public ResponseEntity<Void> writePostit(@RequestBody PostitWriteRequestDto postitDto) throws CRUDException {
        postitService.writePostit(postitDto);
        return ResponseEntity.status(200).build();
    }

    /**
     * 기존 포스트잇 <b>하나</b>를 로드해온다.
     *
     * @param postitDto PostitRequestDto
     * @return 포스트잇의 contents데이터가 포함된 dto 객체.
     */
    @GetMapping("/get")
    public ResponseEntity<PostitResponseDto> getPostit(@ModelAttribute PostitRequestDto postitDto) {
        PostitResponseDto responseDto = postitService.getPostit(postitDto);
        return ResponseEntity.ok(responseDto);
    }

    /**
     * 포스트잇을 삭제한다.
     *
     * @param postitDto PostitDeleteRequestDto 포스트잇 정보가 담긴 객체
     * @return 삭제성공여부(200), 실패시 600
     */
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deletePostit(@RequestBody PostitDeleteRequestDto postitDto) {
        postitService.deletePostit(postitDto);
        return ResponseEntity.ok(null);
    }


}
