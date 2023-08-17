package com.ssafy.stargate.model.dto.request.meeting;

import lombok.*;
import java.util.UUID;


@Getter
@Setter
@ToString
public class MeetingDeleteRequestDto {
    private UUID uuid;
}
