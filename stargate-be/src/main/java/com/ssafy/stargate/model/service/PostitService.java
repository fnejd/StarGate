package com.ssafy.stargate.model.service;

import com.ssafy.stargate.model.dto.common.PostitDto;

public interface PostitService {
    void writePostit(PostitDto postitDto);

    PostitDto getPostit(PostitDto postitDto);

    void deletePostit(PostitDto postitDto);
}
