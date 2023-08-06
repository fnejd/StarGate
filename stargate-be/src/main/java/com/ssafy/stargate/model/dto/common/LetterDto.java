package com.ssafy.stargate.model.dto.common;


import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LetterDto {

    private long no;
    private String contents;
    private String email;
    private long memberNo;
    private UUID uuid;
    private LocalDateTime createDate;
    private LocalDateTime editDate;

}
