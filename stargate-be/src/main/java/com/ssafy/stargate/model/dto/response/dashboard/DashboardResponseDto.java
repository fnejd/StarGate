package com.ssafy.stargate.model.dto.response.dashboard;

import java.util.List;
import lombok.*;

/**
 * 대시보드 응답에 관한 dto
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DashboardResponseDto {

    List<DashboardMeetingResponseDto> expected;
    List<DashboardMeetingResponseDto> ongoing;
    List<DashboardMeetingResponseDto> finished;
}
