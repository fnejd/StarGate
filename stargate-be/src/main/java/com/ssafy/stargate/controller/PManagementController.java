package com.ssafy.stargate.controller;

import com.ssafy.stargate.model.dto.common.PGroupDto;
import com.ssafy.stargate.model.service.PManagementService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**
 * 소속사의 그룹, 멤버 관리를 수행하는 컨트롤러
 */
@RequestMapping("/pmanagements")
@RestController
@Slf4j
public class PManagementController {
    @Autowired
    PManagementService managmentService;

    /**
     * 소속사이메일 기준으로 보유한 모든 그룹의 목록을 반환한다.
     * @param principal 소속사 email이 담긴 객체
     * @return List&lt;PGroupDto&gt; 그룹 목록(멤버 데이터 미포함)
     */
    @GetMapping("/")
    public ResponseEntity<?> getGroupList(Principal principal){
        List<PGroupDto> groupList = managmentService.getGroupList(principal);
        return ResponseEntity.ok(groupList);
    }

    /**
     * 신규 그룹을 생성한다.
     * @param principal 소속사 이메일이 포함된 객체
     * @return 신규 생성한 그룹 객체
     */
    @PostMapping("/group/create")
    public ResponseEntity<?> createGroup(@RequestBody PGroupDto dto, Principal principal){
        PGroupDto group = managmentService.createGroup(dto,principal);
        return ResponseEntity.status(201).body(group);
    }


}
