package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.request.letter.LetterDeleteRequestDto;
import com.ssafy.stargate.model.dto.request.letter.LetterFindByMeetingRequestDto;
import com.ssafy.stargate.model.dto.request.letter.LetterFindByMemberRequestDto;
import com.ssafy.stargate.model.dto.request.letter.LetterWriteRequestDto;
import com.ssafy.stargate.model.dto.response.letter.LetterListResponseDto;
import com.ssafy.stargate.model.dto.response.letter.LetterResponseDto;



/**
 * 편지 서비스 인터페이스
 */
public interface LetterService {

    public LetterResponseDto writeLetter(LetterWriteRequestDto dto) throws NotFoundException;

    public void deleteLetter(LetterDeleteRequestDto dto);

    public LetterResponseDto getLetter(Long no) throws NotFoundException;

    public LetterListResponseDto getLetterByMeeting(LetterFindByMeetingRequestDto dto);

    public LetterListResponseDto getLetterByMember(LetterFindByMemberRequestDto memberNo);

    public LetterListResponseDto getLetterByFUser(String email);

}
