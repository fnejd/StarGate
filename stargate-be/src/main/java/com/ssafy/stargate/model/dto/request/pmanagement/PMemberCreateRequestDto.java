package com.ssafy.stargate.model.dto.request.pmanagement;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PMemberCreateRequestDto {
    private long groupNo;
    private String name; // 멤버이름
}
