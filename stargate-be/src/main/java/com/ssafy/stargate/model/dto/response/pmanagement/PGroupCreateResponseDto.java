package com.ssafy.stargate.model.dto.response.pmanagement;

import lombok.*;

@Builder
@Setter
@Getter
@AllArgsConstructor
public class PGroupCreateResponseDto {
    private long groupNo;
    private String name;
}
