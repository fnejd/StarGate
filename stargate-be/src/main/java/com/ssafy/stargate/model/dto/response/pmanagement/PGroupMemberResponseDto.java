package com.ssafy.stargate.model.dto.response.pmanagement;

import com.ssafy.stargate.model.dto.common.PMemberDto;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PGroupMemberResponseDto {
    private long groupNo;
    private String name;
    private List<PMemberDto> members;
}
