package com.ssafy.stargate.model.service;

import com.ssafy.stargate.model.dto.request.pmanagement.*;
import com.ssafy.stargate.model.dto.response.pmanagement.PGroupMemberResponseDto;
import com.ssafy.stargate.model.dto.response.pmanagement.PGroupCreateResponseDto;
import com.ssafy.stargate.model.dto.response.pmanagement.PMemberCreateResponseDto;

import java.security.Principal;
import java.util.List;

public interface PManagementService {
    List<PGroupMemberResponseDto> getGroupList(Principal principal);

    PGroupCreateResponseDto createGroup(PGroupCreateRequestDto dto, Principal principal);

    void deleteGroup(PGroupDeleteRequestDto dto, Principal principal);

    void deleteMember(PMemberDeleteRequestDto dto);

    void updateGroup(PGroupUpdateRequestDto dto, Principal principal);

    PMemberCreateResponseDto createMember(PMemberCreateRequestDto dto);

    void updateMember(PMemberUpdateRequestDto dto);
}
