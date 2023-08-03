package com.ssafy.stargate.model.dto.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MemoDto {
    @JsonIgnore
    private String id;
    private UUID uuid; // meeting
    @JsonIgnore
    private String email; // user
    private String contents;
}
