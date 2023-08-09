package com.ssafy.stargate.model.dto.request.postit;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
public class PostitWriteRequestDto {
    private long no;
    private String fanEmail;
    private long memberNo;
    private UUID meetingUuid;
    private String contents;

}
