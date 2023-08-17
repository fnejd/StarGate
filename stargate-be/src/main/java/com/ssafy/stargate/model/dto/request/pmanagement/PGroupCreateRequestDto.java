package com.ssafy.stargate.model.dto.request.pmanagement;

import lombok.*;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PGroupCreateRequestDto {
    private String name;
}
