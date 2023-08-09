package com.ssafy.stargate.model.dto.request.postit;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class PostitRequestDto {
    private String fanEmail;
    private long memberNo;
    private UUID meetingUuid;
}
