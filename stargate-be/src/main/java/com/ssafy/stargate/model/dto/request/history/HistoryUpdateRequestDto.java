package com.ssafy.stargate.model.dto.request.history;

import lombok.*;

@Setter
@Getter
@ToString
public class HistoryUpdateRequestDto {
    private Long no;
    private String contents;
}
