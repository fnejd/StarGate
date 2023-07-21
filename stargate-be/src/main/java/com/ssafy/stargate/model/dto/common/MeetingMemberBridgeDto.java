package com.ssafy.stargate.model.dto.common;

import com.ssafy.stargate.model.entity.Meeting;
import com.ssafy.stargate.model.entity.PMember;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MeetingMemberBridgeDto {
    private long no;
    private long memberNo; // PMember
    private int orderNum;

}
