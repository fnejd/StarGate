package com.ssafy.stargate.model.dto.response.pmanagement;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class PMemberCreateResponseDto {
    private long memberNo;
    private String name;
}
