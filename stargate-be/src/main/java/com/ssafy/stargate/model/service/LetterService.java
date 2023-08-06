package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.common.LetterDto;

import java.util.List;


/**
 * 편지 서비스 인터페이스
 */
public interface LetterService {

    public LetterDto writeLetter(LetterDto dto) throws NotFoundException;

    public void deleteLetter(LetterDto dto);

    public LetterDto getLetter(Long no) throws NotFoundException;

    public List<LetterDto> getLetterByMeeting(LetterDto dto);

    public List<LetterDto> getLetterByMember(LetterDto memberNo);

    public List<LetterDto> getLetterByFUser(String email);

}
