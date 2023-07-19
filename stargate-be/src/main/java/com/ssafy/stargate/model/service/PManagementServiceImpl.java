package com.ssafy.stargate.model.service;

import com.ssafy.stargate.model.dto.common.PGroupDto;
import com.ssafy.stargate.model.dto.common.PMemberDto;
import com.ssafy.stargate.model.entity.PGroup;
import com.ssafy.stargate.model.entity.PMember;
import com.ssafy.stargate.model.entity.PUser;
import com.ssafy.stargate.model.repository.PGroupRepository;
import com.ssafy.stargate.model.repository.PMemberRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@Slf4j
public class PManagementServiceImpl implements PManagementService {
    @Autowired
    PMemberRepository memberRepository;
    @Autowired
    PGroupRepository groupRepository;


    /**
     * 소속사가 보유한 그룹 리스트를 가져온다.
     *
     * @param principal 유저 email이 포함된 principal 객체
     * @return 해당 소속사 유저가 보유한 모든 그룹의 리스트
     */
    @Override
    public List<PGroupDto> getGroupList(Principal principal) {
        String email = principal.getName();
        log.info("PUSER EMAIL = {}", email);
        List<PGroup> groups = groupRepository.findAllByEmail(email);
        return groups.stream().map((pGroup -> PGroupDto.builder()
                .groupNo(pGroup.getGroupNo())
                .name(pGroup.getName())
                .build()
        )).toList();
    }

    /**
     * 신규 연예인 그룹을 생성한다.
     *
     * @param principal 소속사 이메일이 포함된 객체
     * @return 신규 그룹 객체(멤버 미포함)
     */
    @Override
    public PGroupDto createGroup(PGroupDto dto, Principal principal) {
        String email = principal.getName();
        log.info("data : {}", dto);
        PGroup pGroup = PGroup.builder()
                .name(dto.getName())
                .pUser(PUser.builder().email(email).build())
                .build();
        groupRepository.save(pGroup);
        memberRepository.saveAll(dto.getMembers().stream().map(pMemberDto -> PMember.builder()
                .pGroup(pGroup)
                .name(pMemberDto.getName())
                .build()
        ).toList());
        return PGroupDto.builder()
                .groupNo(pGroup.getGroupNo())
                .name(pGroup.getName())
                .build();
    }
}
