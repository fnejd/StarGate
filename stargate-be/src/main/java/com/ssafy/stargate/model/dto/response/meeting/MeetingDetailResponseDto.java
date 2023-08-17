package com.ssafy.stargate.model.dto.response.meeting;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class MeetingDetailResponseDto {
    private UUID uuid;
    private String name;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime startDate;
    private int waitingTime;
    private int meetingTime;
    private int photoNum;
    private String notice;
    private SavedFileResponseDto imageFileInfo;
    private List<MeetingFUser> meetingFUsers;
    private List<MeetingMember> meetingMembers;
    private long groupNo;
    private String groupName;

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class MeetingFUser{
        @JsonIgnore
        private long no;
        private String email; // FUser
        private int orderNum;
        private Boolean isRegister;
        private String name;
    }

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class MeetingMember {
        @JsonIgnore
        private UUID uuid;
        private long memberNo; // PMember
        private int orderNum;
        private String roomId;
        private String name;
    }
}
