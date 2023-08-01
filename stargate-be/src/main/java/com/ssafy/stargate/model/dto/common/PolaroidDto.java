package com.ssafy.stargate.model.dto.common;

import lombok.*;
import java.util.UUID;


@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PolaroidDto {
    private long no;
    private String email; // fUser
    private long memberNo; // member
    private UUID uuid; // meeting
    private SavedFileDto imageFileInfo;
}
