package com.ssafy.stargate.model.dto.common;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MeetingFUserBridgeDto {
    @JsonIgnore
    private long no;
    private String email; // FUser
    private int orderNum;
}
