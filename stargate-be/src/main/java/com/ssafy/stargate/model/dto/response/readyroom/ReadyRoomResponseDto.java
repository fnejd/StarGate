package com.ssafy.stargate.model.dto.response.readyroom;

import com.ssafy.stargate.model.dto.response.file.SavedFileResponseDto;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReadyRoomResponseDto {
    private UUID uuid;
    private String name;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime startDate;
    private int waitingTime;
    private int meetingTime;
    private int photoNum;
    private String notice;
    private SavedFileResponseDto imageFileInfo;
    private long groupNo;
    private String groupName;
    private MeetingFUser meetingFUser;
    private List<MeetingMember> meetingMembers;

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class MeetingFUser {
        private String email; // FUser
        private int orderNum;
        private String name;

        private long remainingTime;
        private int remainingFanNum;
        private String memoContents;
    }

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class MeetingMember {
        private long memberNo; // PMember
        private int orderNum;
        private String roomId;
        private String name;

        private Boolean isPolaroidEnable;
        private String postitContents;
    }
}
