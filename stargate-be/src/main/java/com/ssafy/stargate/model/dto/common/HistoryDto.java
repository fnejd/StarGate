package com.ssafy.stargate.model.dto.common;


import com.ssafy.stargate.model.entity.History;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class HistoryDto {
    private Long no;
    private String contents;
    private Long memberNo;
    private String email;
    private LocalDateTime createDate;

    public static HistoryDto entityToDto(History history) {
        return HistoryDto.builder()
                .no(history.getNo())
                .memberNo(history.getPMember().getMemberNo())
                .email(history.getFUser().getEmail())
                .contents(history.getContents())
                .createDate(history.getCreateDate())
                .build();
    }
}
