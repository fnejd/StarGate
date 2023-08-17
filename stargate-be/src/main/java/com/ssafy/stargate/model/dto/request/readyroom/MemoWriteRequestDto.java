package com.ssafy.stargate.model.dto.request.readyroom;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@ToString
public class MemoWriteRequestDto {
    private UUID uuid; // meeting
    private String contents;
}
