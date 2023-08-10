package com.ssafy.stargate.model.dto.response.meeting;

import com.ssafy.stargate.model.entity.Meeting;
import com.ssafy.stargate.model.entity.MeetingFUserBridge;
import com.ssafy.stargate.model.entity.MeetingMemberBridge;
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
public class MeetingResponseDto {
    private UUID uuid;
    private String name;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime startDate;
    private int waitingTime;
    private int meetingTime;
    private int photoNum;
    private String notice;
    private String meetingFUsers;
    private String meetingMembers;

    public static MeetingResponseDto entityToDto(Meeting meeting) {
        return MeetingResponseDto.builder()
                .uuid(meeting.getUuid())
                .name(meeting.getName())
                .startDate(meeting.getStartDate())
                .waitingTime(meeting.getWaitingTime())
                .meetingTime(meeting.getMeetingTime())
                .notice(meeting.getNotice())
                .photoNum(meeting.getPhotoNum())
                .meetingMembers(entityToDtoMeetingMemberList(meeting.getMeetingMembers()))
                .meetingFUsers(entityToDtoMeetingFUserList(meeting.getMeetingFUsers()))
                .build();
    }

    public static String entityToDtoMeetingMemberList(List<MeetingMemberBridge> meetingMembers) {
        return meetingMembers.stream().map(meetingMember -> meetingMember.getPMember().getMemberNo()).toList().toString();
    }

    public static String entityToDtoMeetingFUserList(List<MeetingFUserBridge> meetingFUsers) {
        return meetingFUsers.stream().map(meetingFUser -> meetingFUser.getEmail()).toList().toString();
    }
}
