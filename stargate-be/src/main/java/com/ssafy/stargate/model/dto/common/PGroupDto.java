package com.ssafy.stargate.model.dto.common;

import com.ssafy.stargate.model.dto.common.PMemberDto;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PGroupDto {
    private long groupNo;
    private String name;
    private List<PMemberDto> members;
}
