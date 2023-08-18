package com.ssafy.stargate.model.dto.response.meetingroom;

import lombok.*;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MeetingRoomFUserResponseDto {
    private String email; // FUser
    private int waitingTime;
    private int meetingTime;
    private int photoNum;
    private String memoContents;
    private List<MeetingMember> meetingMembers;

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class MeetingMember {
        private long memberNo; // PMember
        private String name;
        private String roomId;
        private Boolean isPolaroidEnable;
        private String postitContents;
    }
}