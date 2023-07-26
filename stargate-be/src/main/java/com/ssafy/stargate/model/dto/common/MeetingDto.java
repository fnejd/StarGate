package com.ssafy.stargate.model.dto.common;

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
public class MeetingDto {
    private UUID uuid;
    private String name;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime startDate;
    private int waitingTime;
    private int meetingTime;
    private int photoNum;
    private String notice;
    private List<MeetingFUserBridgeDto> meetingFUsers;
    private List<MeetingMemberBridgeDto> meetingMembers;

    public static MeetingDto entityToDto(Meeting meeting) {
        return MeetingDto.builder()
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

    public static List<MeetingMemberBridgeDto> entityToDtoMeetingMemberList(List<MeetingMemberBridge> meetingMembers) {
        return (List<MeetingMemberBridgeDto>) meetingMembers.stream()
                .map(meetingMember -> MeetingMemberBridgeDto.builder()
                        .uuid(meetingMember.getUuid())
                        .memberNo(meetingMember.getPMember().getMemberNo())
                        .orderNum(meetingMember.getOrderNum())
                        .build()).toList();
    }

    public static List<MeetingFUserBridgeDto> entityToDtoMeetingFUserList(List<MeetingFUserBridge> meetingFUsers) {
        return (List<MeetingFUserBridgeDto>) meetingFUsers.stream()
                .map(meetingFUser -> MeetingFUserBridgeDto.builder()
                        .no(meetingFUser.getNo())
                        .email(meetingFUser.getEmail())
                        .orderNum(meetingFUser.getOrderNum())
                        .build()).toList();
    }
}
