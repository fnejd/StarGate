package com.ssafy.stargate.model.dto.request.readyroom;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@ToString
public class PolaroidEnableWriteRequsetDto {
    private UUID uuid; // meeting
    private List<MeetingMemberDto> meetingMembers;

    @Getter
    @Setter
    @ToString
    public static class MeetingMemberDto {
        private Long memberNo;
        private Boolean isPolaroidEnable;
    }
}
