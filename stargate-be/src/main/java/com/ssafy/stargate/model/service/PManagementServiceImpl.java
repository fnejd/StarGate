package com.ssafy.stargate.model.service;

import com.ssafy.stargate.model.dto.common.PMemberDto;
import com.ssafy.stargate.model.dto.request.pmanagement.*;
import com.ssafy.stargate.model.dto.response.pmanagement.PGroupMemberResponseDto;
import com.ssafy.stargate.model.dto.response.pmanagement.PGroupCreateResponseDto;
import com.ssafy.stargate.model.dto.response.pmanagement.PMemberCreateResponseDto;
import com.ssafy.stargate.model.entity.PGroup;
import com.ssafy.stargate.model.entity.PMember;
import com.ssafy.stargate.model.repository.PGroupRepository;
import com.ssafy.stargate.model.repository.PMemberRepository;
import com.ssafy.stargate.model.repository.PUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class PManagementServiceImpl implements PManagementService {


    private final PMemberRepository memberRepository;

    private final PGroupRepository groupRepository;

    private final PUserRepository pUserRepository;


    /**
     * 소속사의 그룹 리스트를 가져온다.
     * 이 그룹 리스트에는 각기 리스트 소속의 연예인이 포함된다.
     *
     * @param principal 유저 email이 포함된 principal 객체
     * @return 해당 소속사 유저가 보유한 모든 그룹의 리스트
     */
    @Override
    public List<PGroupMemberResponseDto> getGroupList(Principal principal) {
        String email = principal.getName();
        List<PGroup> groups = groupRepository.findAllByEmail(email);
        return groups.stream().map((pGroup -> PGroupMemberResponseDto.builder()
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
    public PGroupCreateResponseDto createGroup(PGroupCreateRequestDto dto, Principal principal) {
        String email = principal.getName();
        log.info("data : {}", dto);
        PGroup pGroup = PGroup.builder()
                .name(dto.getName())
                .pUser(pUserRepository.getReferenceById(email))
                .build();
        groupRepository.save(pGroup);
        return PGroupCreateResponseDto.builder()
                .groupNo(pGroup.getGroupNo())
                .name(pGroup.getName())
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
    public void deleteGroup(PGroupDeleteRequestDto dto, Principal principal) {
        String email = principal.getName();
        log.info("email = {}, groupNo = {}", email, dto.getGroupNo());
        long groupNo = dto.getGroupNo();

        groupRepository.deleteGroupByGroupNo(groupNo, email);
    }

    /**
     * 그룹 정보를 갱신한다.
     * 2023-07-20기준으로 이름만 변경한다.
     *
     * @param dto       PGroupDto 그룹번호, 그룹이름
     * @param principal 인증정보
     */
    @Override
    public void updateGroup(PGroupUpdateRequestDto dto, Principal principal) {
        PGroup pGroup = groupRepository.findByGroupNoAndEmail(dto.getGroupNo(), principal.getName());
        pGroup.setName(dto.getName());
        groupRepository.save(pGroup);
    }

    /**
     * 전달받은 그룹 번호 아래로 신규 멤버를 생성한다.
     *
     * @param dto PGroupDto 그룹정보, 멤버정보는 members 0번 인덱스
     * @return 성공시 멤버 정보(번호 포함)반환
     */
    @Override
    public PMemberCreateResponseDto createMember(PMemberCreateRequestDto dto) {
        PGroup pGroup = groupRepository.findById(dto.getGroupNo()).orElseThrow();
        PMember pMember = PMember.builder()
                .name(dto.getName())
                .pGroup(pGroup)
                .build();
        memberRepository.save(pMember);
        return PMemberCreateResponseDto.builder()
                .memberNo(pMember.getMemberNo())
                .name(pMember.getName())
                .build();
    }

    /**
     * 멤버 번호를 기반으로 삭제한다.
     *
     * @param dto PMemberDto 삭제할 멤버 번호가 포함된 멤버dto
     */
    @Override
    public void deleteMember(PMemberDeleteRequestDto dto) {
        memberRepository.deleteMemberByMemberNo(dto.getMemberNo());
    }

    /**
     * 소속사 계정정보 업데이트
     *
     * @param dto PMemberDto 소속사 계정정보
     */
    @Override
    public void updateMember(PMemberUpdateRequestDto dto) {
        PMember pMember = memberRepository.findById(dto.getMemberNo()).orElseThrow();
        pMember.setName(dto.getName());
        memberRepository.save(pMember);
    }
}
