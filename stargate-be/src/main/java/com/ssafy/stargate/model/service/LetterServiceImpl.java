package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.request.letter.LetterDeleteRequestDto;
import com.ssafy.stargate.model.dto.request.letter.LetterFindByMeetingRequestDto;
import com.ssafy.stargate.model.dto.request.letter.LetterFindByMemberRequestDto;
import com.ssafy.stargate.model.dto.request.letter.LetterWriteRequestDto;
import com.ssafy.stargate.model.dto.response.letter.LetterListResponseDto;
import com.ssafy.stargate.model.dto.response.letter.LetterResponseDto;
import com.ssafy.stargate.model.entity.FUser;
import com.ssafy.stargate.model.entity.Letter;
import com.ssafy.stargate.model.entity.Meeting;
import com.ssafy.stargate.model.entity.PMember;
import com.ssafy.stargate.model.repository.FUserRepository;
import com.ssafy.stargate.model.repository.LetterRepository;
import com.ssafy.stargate.model.repository.MeetingRepository;
import com.ssafy.stargate.model.repository.PMemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

/**
 * 편지 서비스 구현체
 */
@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class LetterServiceImpl implements LetterService {

    private final LetterRepository letterRepository;

    private final FUserRepository fUserRepository;

    private final MeetingRepository meetingRepository;

    private final PMemberRepository pMemberRepository;

    
    /**
     * 편지 작성해서 저장 및 수정
     * @param principal
     * @param dto LetterWriteRequestDto 팬유저가 작성한 편지 정보 담는 dto
     * @return LetterResponseDto 저장된 편지 정보 dto
     * @throws NotFoundException 존재하지 않는 회원, 존재하지 않는 멤버, 존재하지 않는 팬미팅 에러
     */
    @Override
    public LetterResponseDto writeLetter(Principal principal, LetterWriteRequestDto dto) throws NotFoundException {

        String email = principal.getName();

        Letter letter = letterRepository.findLetter(email, dto.getMemberNo(), dto.getUuid()).orElse(null);

        if (letter == null) {

            FUser fUser = fUserRepository.findById(email).orElseThrow(() -> new NotFoundException("존재하지 않는 회원입니다."));
            PMember pMember = pMemberRepository.findById(dto.getMemberNo()).orElseThrow(() -> new NotFoundException("존재하지 않는 멤버입니다."));
            Meeting meeting = meetingRepository.findById(dto.getUuid()).orElseThrow(() -> new NotFoundException("존재하지 않는 팬미팅입니다."));

            letter = Letter.builder()
                    .contents(dto.getContents())
                    .fUser(fUser)
                    .pMember(pMember)
                    .meeting(meeting)
                    .build();
        } else {
            letter.setContents(dto.getContents());
        }

        Letter savedLetter = letterRepository.save(letter);

        log.info("저장된 편지 번호 {}", savedLetter.getNo());

        return LetterResponseDto.builder()
                .no(savedLetter.getNo())
                .contents(savedLetter.getContents())
                .email(savedLetter.getFUser().getEmail())
                .memberNo(savedLetter.getPMember().getMemberNo())
                .uuid(savedLetter.getMeeting().getUuid())
                .createDate(savedLetter.getCreateDate())
                .name(savedLetter.getPMember().getName())
                .build();
    }


    /**
     * 편지 삭제
     *
     * @param dto LetterDeleteRequestDto 삭제하려는 편지 번호 정보를 담는 dto
     */
    @Override
    public void deleteLetter(LetterDeleteRequestDto dto) {

        letterRepository.deleteById(dto.getNo());
    }


    /**
     * 편지 번호로 조회해서 해당하는 편지 정보 반환
     *
     * @param no Long 편지 번호
     * @return LetterResponseDto 편지 정보가 담긴 dto
     * @throws NotFoundException 존재 하지 않는 편지 에러
     */
    @Override
    public LetterResponseDto getLetter(Long no) throws NotFoundException {

        Letter letter = letterRepository.findById(no).orElseThrow(() -> new NotFoundException("찾으려는 편지는 존재하지 않는 편지입니다"));

        return LetterResponseDto.builder()
                .no(letter.getNo())
                .contents(letter.getContents())
                .createDate(letter.getCreateDate())
                .editDate(letter.getEditDate())
                .memberNo(letter.getPMember().getMemberNo())
                .email(letter.getFUser().getEmail())
                .uuid(letter.getMeeting().getUuid())
                .name(letter.getPMember().getName())
                .build();
    }

    /**
     * 팬미팅 번호를 기준으로 편지들 정보 조회
     *
     * @param dto LetterFindByMeetingRequestDto 편지 찾기 위한 dto
     * @return LetterListResponseDto 팬미팅에 보내진 편지 목록
     */
    @Override
    public LetterListResponseDto getLetterByMeeting(LetterFindByMeetingRequestDto dto) {

        List<Letter> letters = letterRepository.findByMeeting_Uuid(dto.getUuid()).orElse(null);

        return LetterListResponseDto.builder()
                .letters(
                        letters.stream().map((letter -> LetterResponseDto.builder()
                                .no(letter.getNo())
                                .contents(letter.getContents())
                                .email(letter.getFUser().getEmail())
                                .memberNo(letter.getPMember().getMemberNo())
                                .uuid(letter.getMeeting().getUuid())
                                .createDate(letter.getCreateDate())
                                .editDate(letter.getEditDate())
                                .name(letter.getPMember().getName())
                                .build()
                        )).toList()
                ).build();
    }

    /**
     * 연예인 번호를 기준으로 편지들 정보 조회
     *
     * @param dto LetterFindByMemberRequestDto 편지 찾기 위한 dto
     * @return LetterListResponseDto 연예인에게 보내진 편지 목록
     */
    @Override
    public LetterListResponseDto getLetterByMember(LetterFindByMemberRequestDto dto) {

        List<Letter> letters = letterRepository.findBypMemberMemberNo(dto.getMemberNo()).orElseThrow();

        return LetterListResponseDto.builder()
                .letters(
                        letters.stream().map((letter -> LetterResponseDto.builder()
                                .no(letter.getNo())
                                .contents(letter.getContents())
                                .email(letter.getFUser().getEmail())
                                .memberNo(letter.getPMember().getMemberNo())
                                .uuid(letter.getMeeting().getUuid())
                                .createDate(letter.getCreateDate())
                                .editDate(letter.getEditDate())
                                .name(letter.getPMember().getName())
                                .build()
                        )).toList()
                ).build();
    }

    /**
     * 팬유저가 작성한 편지 목록 조회
     *
     * @param email String 팬유저 이메일
     * @return LetterListResponseDto 팬유저가 작성한 편지 목록
     */
    @Override
    public LetterListResponseDto getLetterByFUser(String email) {

        List<Letter> letters = letterRepository.findByfUserEmail(email).orElseThrow();

        return LetterListResponseDto.builder()
                .letters(
                        letters.stream().map((letter -> LetterResponseDto.builder()
                                .no(letter.getNo())
                                .contents(letter.getContents())
                                .email(letter.getFUser().getEmail())
                                .memberNo(letter.getPMember().getMemberNo())
                                .uuid(letter.getMeeting().getUuid())
                                .createDate(letter.getCreateDate())
                                .editDate(letter.getEditDate())
                                .name(letter.getPMember().getName())
                                .build()
                        )).toList()
                ).build();

    }
}
