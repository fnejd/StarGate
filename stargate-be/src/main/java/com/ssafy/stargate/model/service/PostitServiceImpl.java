package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.model.dto.request.postit.PostitDeleteRequestDto;
import com.ssafy.stargate.model.dto.request.postit.PostitRequestDto;
import com.ssafy.stargate.model.dto.request.postit.PostitWriteRequestDto;
import com.ssafy.stargate.model.dto.response.postit.PostitResponseDto;
import com.ssafy.stargate.model.entity.Postit;
import com.ssafy.stargate.model.repository.FUserRepository;
import com.ssafy.stargate.model.repository.MeetingRepository;
import com.ssafy.stargate.model.repository.PMemberRepository;
import com.ssafy.stargate.model.repository.PostitRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostitServiceImpl implements PostitService {

    private final PostitRepository postitRepository;

    private final MeetingRepository meetingRepository;

    private final PMemberRepository pMemberRepository;

    private final FUserRepository fUserRepository;

    /**
     * 포스트잇을 작성한다.
     * 기존의 포스트잇이 있으면 정보를 업데이트한다.
     *
     * @param postitDto 신규 포스트잇 정보가 담긴 DTO객체
     * @throws CRUDException 포스트잇 작성 실패
     */
    @Override
    public void writePostit(PostitWriteRequestDto postitDto) throws CRUDException {
        try {
            List<Postit> postitList = postitDto.getPostitDatas().stream().map(postitData -> {
                Postit postit = postitRepository.findPostit(postitDto.getEmail(), postitData.getMemberNo(), postitDto.getUuid()).orElse(Postit.builder()
                        .fUser(fUserRepository.getReferenceById(postitDto.getEmail()))
                        .pMember(pMemberRepository.getReferenceById(postitData.getMemberNo()))
                        .meeting(meetingRepository.getReferenceById(postitDto.getUuid()))
                        .build());
                postit.setContents(postitData.getPostitContents());
                return postit;
            }).toList();
            postitRepository.saveAll(postitList);
        } catch (Exception e) {
            log.warn(e.getMessage());
            throw new CRUDException("포스트잇 작성 중 오류가 발생했습니다.");
        }
    }

    /**
     * 팬 이메일, 멤버 번호, 싸인회 고유번호에 따라 포스트잇을 쿼리해온다.
     *
     * @param postitDto email(fan), memberNo, uuid(meeting)을 담은 dto
     * @return 쿼리한 포스트잇 dto 객체
     */
    @Override
    public PostitResponseDto getPostit(PostitRequestDto postitDto) {
        Postit postit = postitRepository.findPostit(postitDto.getFanEmail(), postitDto.getMemberNo(), postitDto.getMeetingUuid()).orElseThrow();
        return PostitResponseDto.fromEntity(postit);
    }

    /**
     * 팬 이메일, 멤버 번호, 싸인회 고유번호를 기준으로 포스트잇을 삭제한다.
     *
     * @param postitDto : PostitDto : no만 필요.
     */
    @Override
    public void deletePostit(PostitDeleteRequestDto postitDto) {
        Postit postit = postitRepository.findById(postitDto.getNo()).orElseThrow();
        postitRepository.delete(postit);
    }
}
