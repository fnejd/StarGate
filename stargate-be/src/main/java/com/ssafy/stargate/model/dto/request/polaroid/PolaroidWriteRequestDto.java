package com.ssafy.stargate.model.dto.request.polaroid;

import lombok.*;
import java.util.UUID;


@Getter
@Setter
@ToString
public class PolaroidWriteRequestDto {
    private UUID uuid; // meeting
    private String email; // fUser
    private long memberNo; // member
}
