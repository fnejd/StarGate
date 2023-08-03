package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.model.dto.common.PostitDto;

public interface PostitService {
    void writePostit(PostitDto postitDto) throws CRUDException;

    PostitDto getPostit(PostitDto postitDto);

    void deletePostit(PostitDto postitDto);
}
