package com.ssafy.stargate.model.service;

import com.ssafy.stargate.model.dto.common.PGroupDto;
import com.ssafy.stargate.model.dto.common.PMemberDto;

import java.security.Principal;
import java.util.List;

public interface PManagementService {
    List<PGroupDto> getGroupList(Principal principal);

    PGroupDto createGroup(PGroupDto dto, Principal principal);

    void deleteGroup(PGroupDto dto, Principal principal);

    void deleteMember(PMemberDto dto);

    void updateGroup(PGroupDto dto);

    PMemberDto createMember(PGroupDto dto);

    void updateMember(PMemberDto dto);
}
