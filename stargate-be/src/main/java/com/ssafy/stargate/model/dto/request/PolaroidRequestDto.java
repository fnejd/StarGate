package com.ssafy.stargate.model.dto.request;

import com.ssafy.stargate.model.dto.common.SavedFileDto;
import lombok.*;
import java.util.UUID;


@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PolaroidRequestDto {
    private UUID uuid; // meeting
    private String email; // fUser
    private long memberNo; // member
}
