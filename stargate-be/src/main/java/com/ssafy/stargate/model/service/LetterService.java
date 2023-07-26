package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.LetterException;
import com.ssafy.stargate.model.dto.common.LetterDto;
import com.ssafy.stargate.model.dto.request.LetterCreateRequestDto;
import com.ssafy.stargate.model.dto.request.LetterDeleteRequestDto;
import com.ssafy.stargate.model.dto.request.LetterFindRequestDto;
import com.ssafy.stargate.model.dto.request.LetterUpdateRequestDto;
import com.ssafy.stargate.model.entity.Letter;

import java.util.List;
import java.util.UUID;

/**
 * 편지 서비스 인터페이스
 */
public interface LetterService {

    public LetterDto createLetter(LetterCreateRequestDto dto);

    public LetterDto updateLetter(LetterUpdateRequestDto dto) throws LetterException;

    public void deleteLetter(LetterDeleteRequestDto dto) throws LetterException;

    public LetterDto getLetter(Long no);

    public List<LetterDto> getLetterByMeeting(LetterFindRequestDto dto);

    public List<LetterDto> getLetterByMember(LetterFindRequestDto memberNo);

    public List<LetterDto> getLetterByFUser(String email);

}
