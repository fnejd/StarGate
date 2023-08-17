package com.ssafy.stargate.controller;

import com.ssafy.stargate.model.dto.request.pmanagement.*;
import com.ssafy.stargate.model.dto.response.pmanagement.PGroupMemberResponseDto;
import com.ssafy.stargate.model.dto.response.pmanagement.PGroupCreateResponseDto;
import com.ssafy.stargate.model.dto.response.pmanagement.PMemberCreateResponseDto;
import com.ssafy.stargate.model.service.PManagementService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**
 * 소속사의 그룹, 멤버 관리를 수행하는 컨트롤러
 */
@RestController
@RequestMapping("/pmanagements")
@RequiredArgsConstructor
@Slf4j
public class PManagementController {
    private final PManagementService managementService;

    /**
     * 소속사이메일 기준으로 보유한 모든 그룹의 목록을 반환한다.
     *
     * @param principal 소속사 email이 담긴 객체
     * @return List&lt;PGroupDto&gt; 그룹 목록(멤버 데이터 미포함)
     */
    @GetMapping("/get")
    public ResponseEntity<?> getGroupList(Principal principal) {
        List<PGroupMemberResponseDto> groupList = managementService.getGroupList(principal);
        return ResponseEntity.ok(groupList);
    }

    /**
     * 신규 그룹을 생성한다.
     *
     *
     * @param dto PGroupCreateRequestDto 생성할 그룹정보가 포함된 객체
     * @param principal 소속사 이메일이 포함된 객체
     * @return 신규 생성한 그룹 객체
     */
    @PostMapping("/group/create")
    public ResponseEntity<PGroupCreateResponseDto> createGroup(@RequestBody PGroupCreateRequestDto dto, Principal principal) {
        PGroupCreateResponseDto group = managementService.createGroup(dto, principal);
        return ResponseEntity.status(200).body(group);
    }

    /**
     * 그룹을 삭제한다.
     *
     * @param dto PGroupDeleteRequestDto : 삭제할 그룹 번호가 포함된 dto
     * @param principal : Principal = 소속사 유저 정보(JWT에서)
     * @return 성공여부. 기본 200
     */
    @DeleteMapping("/group/delete")
    public ResponseEntity<?> deleteGroup(@RequestBody PGroupDeleteRequestDto dto, Principal principal) {
        managementService.deleteGroup(dto, principal);
        return ResponseEntity.ok(null);
    }

    /**
     * 그룹 정보를 변경한다. 실질적으로 이름만 변경한다.
     *
     * @param dto PGroupUpdateRequestDto 그룹번호, 신규 이름이 포함된 그룹dto 객체를 반환한다.
     * @param principal Principal 인증객체
     * @return 성공시 200 코드를 반환한다.
     */
    @PutMapping("/group/update")
    public ResponseEntity<?> updateGroup(@RequestBody PGroupUpdateRequestDto dto, Principal principal) {
        managementService.updateGroup(dto, principal);
        return ResponseEntity.ok(null);
    }

    /**
     * 그룹에 신규 멤버를 추가한다. 그룹 번호가 필요하다.
     * 신규 멤버는 members의 0번 인덱스에 하나 배치한다.
     *
     * @param dto PMemberCreateRequestDto 멤버 정보
     * @return 성공시 200
     */
    @PostMapping("/member/create")
    public ResponseEntity<?> createMember(@RequestBody PMemberCreateRequestDto dto) {
        PMemberCreateResponseDto response = managementService.createMember(dto);
        return ResponseEntity.status(200).body(response);
    }

    /**
     * 멤버를 삭제한다.
     *
     * @param dto PMemberDeleteRequestDto 삭제할 멤버 번호가 포함된 PMemberDto객체
     * @return 성공여부
     */
    @DeleteMapping("/member/delete")
    public ResponseEntity<?> deleteMember(@RequestBody PMemberDeleteRequestDto dto) {
        managementService.deleteMember(dto);
        return ResponseEntity.ok(null);
    }

    /**
     * 소속사 계정정보를 업데이트한다.
     * @param dto PMemberUpdateRequestDto 소속사 유저정보가 담긴 객체
     * @return 성공여부 (200), 에러시 (600)
     */
    @PutMapping("/member/update")
    public ResponseEntity<?> updateMember(@RequestBody PMemberUpdateRequestDto dto){
        managementService.updateMember(dto);
        return ResponseEntity.ok(null);
    }

}
