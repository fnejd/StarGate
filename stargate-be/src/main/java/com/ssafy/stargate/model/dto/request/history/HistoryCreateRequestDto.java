package com.ssafy.stargate.model.dto.request.history;

import lombok.*;

@Builder
@Setter
@Getter
@ToString
public class HistoryCreateRequestDto {
    private String contents;
    private Long memberNo;
    private String email; // fanUser
}
