package com.ssafy.stargate.model.dto.request.pmanagement;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PGroupUpdateRequestDto {
    private long groupNo;
    private String name;
}
