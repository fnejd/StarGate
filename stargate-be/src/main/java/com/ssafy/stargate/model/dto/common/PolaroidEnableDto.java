package com.ssafy.stargate.model.dto.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PolaroidEnableDto {
    @JsonIgnore
    private String id;
    private UUID uuid; // meeting
    private List<MeetingMemberDto> meetingMembers;

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class MeetingMemberDto {
        private Long memberNo;
        private Boolean isPolaroidEnable;
    }
}
