package com.ssafy.stargate.model.dto.response;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FUserEmailCheckResponseDto {

    private Boolean exist;
}
