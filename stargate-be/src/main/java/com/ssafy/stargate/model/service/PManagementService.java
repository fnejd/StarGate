package com.ssafy.stargate.model.service;

import com.ssafy.stargate.model.dto.common.PGroupDto;

import java.security.Principal;
import java.util.List;

public interface PManagementService {
    List<PGroupDto> getGroupList(Principal principal);

    PGroupDto createGroup(PGroupDto dto, Principal principal);
}
