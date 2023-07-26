package com.ssafy.stargate.model.dto.request;

import lombok.*;

import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LetterCreateRequestDto {

    private String email;
    private long memberNo;
    private UUID uuid;
    private String contents;
}
