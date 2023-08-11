package com.ssafy.stargate.model.dto.response.meetingroom;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Setter
@Getter
@AllArgsConstructor
@ToString
public class MeetingRoomMemberResponseDto {

    private int waitingTime;
    private int meetingTime;
    private int photoNum;
    private long memberNo;
    private List<InnerMeetingFUser> meetingFUsers;

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @ToString
    public static class InnerMeetingFUser {
        private String email;
        private String name;
        private String nickname;
        private LocalDateTime birthday;
        private boolean polaroidEnable;
        private String postitContent;
        private int totalMeetingCnt;
    }
}
