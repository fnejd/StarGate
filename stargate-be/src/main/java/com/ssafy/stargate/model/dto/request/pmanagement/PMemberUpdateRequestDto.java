package com.ssafy.stargate.model.dto.request.pmanagement;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PMemberUpdateRequestDto {
    private long memberNo;
    private String name;
}
