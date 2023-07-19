package com.ssafy.stargate.model.dto.common;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PMemberDto {
    private long memberNo;
    private String name;
}
