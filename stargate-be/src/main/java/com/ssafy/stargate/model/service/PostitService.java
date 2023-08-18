package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.model.dto.request.postit.PostitDeleteRequestDto;
import com.ssafy.stargate.model.dto.request.postit.PostitRequestDto;
import com.ssafy.stargate.model.dto.request.postit.PostitWriteRequestDto;
import com.ssafy.stargate.model.dto.response.postit.PostitResponseDto;

public interface PostitService {
    void writePostit(PostitWriteRequestDto postitDto) throws CRUDException;

    PostitResponseDto getPostit(PostitRequestDto postitDto);

    void deletePostit(PostitDeleteRequestDto postitDto);
}
