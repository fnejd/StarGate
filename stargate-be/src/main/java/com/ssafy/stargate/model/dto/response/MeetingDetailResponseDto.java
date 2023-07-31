package com.ssafy.stargate.model.dto.response;

import com.ssafy.stargate.model.dto.common.SavedFileDto;
import com.ssafy.stargate.model.dto.common.MeetingFUserBridgeDto;
import com.ssafy.stargate.model.dto.common.MeetingMemberBridgeDto;
import lombok.*;
import lombok.experimental.SuperBuilder;
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
    private SavedFileDto imageFileInfo;
    private List<MeetingFUser> meetingFUsers;
    private List<MeetingMember> meetingMembers;

    @SuperBuilder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class MeetingFUser extends MeetingFUserBridgeDto {
        private boolean isRegister;
        private String name;
    }

    @SuperBuilder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class MeetingMember extends MeetingMemberBridgeDto {
        private String roomId;
    }
}
