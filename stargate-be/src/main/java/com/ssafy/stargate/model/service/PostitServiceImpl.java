package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.model.dto.common.PostitDto;
import com.ssafy.stargate.model.entity.FUser;
import com.ssafy.stargate.model.entity.Meeting;
import com.ssafy.stargate.model.entity.PMember;
import com.ssafy.stargate.model.entity.Postit;
import com.ssafy.stargate.model.repository.FUserRepository;
import com.ssafy.stargate.model.repository.MeetingRepository;
import com.ssafy.stargate.model.repository.PMemberRepository;
import com.ssafy.stargate.model.repository.PostitRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PostitServiceImpl implements PostitService {
    @Autowired
    PostitRepository postitRepository;

    @Autowired
    MeetingRepository meetingRepository;

    @Autowired
    PMemberRepository pMemberRepository;

    @Autowired
    FUserRepository fUserRepository;

    /**
     * 포스트잇을 작성한다.
     * 기존의 포스트잇이 있으면 정보를 업데이트한다.
     * @param postitDto 신규 포스트잇 정보가 담긴 DTO객체
     * @throws CRUDException 포스트잇 작성 실패
     */
    @Override
    public void writePostit(PostitDto postitDto) throws CRUDException {
        try {
            Postit postit = postitRepository.findPostit(postitDto.getFanEmail(), postitDto.getMemberNo(), postitDto.getMeetingUuid()).orElse(null);
            if (postit == null) {
                FUser fUser = fUserRepository.getReferenceById(postitDto.getFanEmail());
                PMember pMember = pMemberRepository.getReferenceById(postitDto.getMemberNo());
                Meeting meeting = meetingRepository.getReferenceById(postitDto.getMeetingUuid());
                postit = Postit.builder()
                        .fUser(fUser)
                        .pMember(pMember)
                        .meeting(meeting)
                        .contents(postitDto.getContents())
                        .build();
                postitRepository.save(postit);
            } else {
                postit.setContents(postitDto.getContents());
                postitRepository.save(postit);
            }
        } catch (Exception e) {
            log.warn(e.getMessage());
            throw new CRUDException("포스트잇 작성 중 오류가 발생했습니다.");
        }
    }

    /**
     * 팬 이메일, 멤버 번호, 싸인회 고유번호에 따라 포스트잇을 쿼리해온다.
     * @param postitDto email(fan), memberNo, uuid(meeting)을 담은 dto
     * @return 쿼리한 포스트잇 dto 객체
     */
    @Override
    public PostitDto getPostit(PostitDto postitDto) {
        Postit postit = postitRepository.findPostit(postitDto.getFanEmail(), postitDto.getMemberNo(), postitDto.getMeetingUuid()).orElseThrow();
        return PostitDto.fromEntity(postit);
    }

    /**
     * 팬 이메일, 멤버 번호, 싸인회 고유번호를 기준으로 포스트잇을 삭제한다.
     * @param postitDto : PostitDto : no만 필요.
     */
    @Override
    public void deletePostit(PostitDto postitDto) {
        Postit postit = postitRepository.findById(postitDto.getNo()).orElseThrow();
        postitRepository.delete(postit);
    }
}
