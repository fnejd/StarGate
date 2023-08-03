package com.ssafy.stargate.model.dto.response;


import com.ssafy.stargate.model.dto.common.MeetingDto;
import com.ssafy.stargate.model.dto.common.SavedFileDto;
import com.ssafy.stargate.model.entity.Meeting;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * 대시보드에 나타나는 과거, 현재, 미팅 dto
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DashboardMeetingResponseDto {

    private UUID uuid;
    private String name;
    private LocalDateTime startDate;
    private long remainingTime;
    private SavedFileDto imageFileInfo;

}
