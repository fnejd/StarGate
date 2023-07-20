package com.ssafy.stargate.model.service;

import com.ssafy.stargate.model.dto.common.PGroupDto;
import com.ssafy.stargate.model.entity.PGroup;
import com.ssafy.stargate.model.entity.PMember;
import com.ssafy.stargate.model.entity.PUser;
import com.ssafy.stargate.model.repository.PGroupRepository;
import com.ssafy.stargate.model.repository.PMemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@Transactional
@Slf4j
public class PManagementServiceImpl implements PManagementService {
    @Autowired
    PMemberRepository memberRepository;
    @Autowired
    PGroupRepository groupRepository;


    /**
     * 소속사의 그룹 리스트를 가져온다.
     * 이 그룹 리스트에는 각기 리스트 소속의 연예인이 포함된다.
     *
     * @param principal 유저 email이 포함된 principal 객체
     * @return 해당 소속사 유저가 보유한 모든 그룹의 리스트
     */
    @Override
    public List<PGroupDto> getGroupList(Principal principal) {
        String email = principal.getName();
        List<PGroup> groups = groupRepository.findAllByEmail(email);
        return groups.stream().map((pGroup -> PGroupDto.builder()
                .groupNo(pGroup.getGroupNo())
                .name(pGroup.getName())
                .members(pGroup.getMembers().stream().map(pMember -> PMemberDto.builder()
                        .memberNo(pMember.getMemberNo())
                        .name(pMember.getName())
                        .build()
                ).toList())
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
        List<PMember> newMembers = memberRepository.saveAll(dto.getMembers().stream().map(pMemberDto -> PMember.builder()
                .pGroup(pGroup)
                .name(pMemberDto.getName())
                .build()
        ).toList());
        return PGroupDto.builder()
                .groupNo(pGroup.getGroupNo())
                .name(pGroup.getName())
                .members(newMembers.stream()
                        .map(pMember -> PMemberDto.builder()
                                .name(pMember.getName()).
                                memberNo(pMember.getMemberNo())
                                .build())
                        .toList())
                .build();
    }

    /**
     * 그룹 번호를 기반으로 삭제한다.
     * 삭제 전에 소속사 체크를 통해 정말로 그룹의 주인인지 확인한다.
     *
     * @param dto       PGroupDto = 삭제할 그룹 번호가 포함된 dto
     * @param principal Principal : 소속사 유저 정보
     */
    @Override
    public void deleteGroup(PGroupDto dto, Principal principal) {
        String email = principal.getName();
        log.info("email = {}, groupNo = {}", email, dto.getGroupNo());
        long groupNo = dto.getGroupNo();

        groupRepository.deleteGroupByGroupNo(groupNo, email);
    }

    /**
     * 그룹 정보를 갱신한다.
     * 2023-07-20기준으로 이름만 변경한다.
     * @param dto PGroupDto 그룹번호, 그룹이름
     */
    @Override
    public void updateGroup(PGroupDto dto) {
       PGroup pGroup = groupRepository.findById(dto.getGroupNo()).orElseThrow();
       pGroup.setName(dto.getName());
       groupRepository.save(pGroup);
    }

    /**
     * 전달받은 그룹 번호 아래로 신규 멤버를 생성한다.
     *
     * @param dto PGroupDto 그룹정보, 멤버정보는 members 0번 인덱스
     * @return
     */
    @Override
    public PMemberDto createMember(PGroupDto dto) {
        PGroup pGroup = groupRepository.findById(dto.getGroupNo()).orElseThrow();
        PMemberDto pMemberDto = dto.getMembers().get(0);
        PMember pMember = PMember.builder()
                .name(pMemberDto.getName())
                .pGroup(pGroup)
                .build();
        memberRepository.save(pMember);
        pMemberDto.setMemberNo(pMember.getMemberNo());
        return pMemberDto;
    }

    /**
     * 멤버 번호를 기반으로 삭제한다.
     * @param dto PMemberDto 삭제할 멤버 번호가 포함된 멤버dto
     */
    @Override
    public void deleteMember(PMemberDto dto) {
        memberRepository.deleteMemberByMemberNo(dto.getMemberNo());
    }

    @Override
    public void updateMember(PMemberDto dto) {
        PMember pMember = memberRepository.findById(dto.getMemberNo()).orElseThrow();
        pMember.setName(dto.getName());
        memberRepository.save(pMember);
    }
}
