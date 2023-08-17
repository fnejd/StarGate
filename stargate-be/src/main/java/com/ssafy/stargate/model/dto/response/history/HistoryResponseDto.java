package com.ssafy.stargate.model.dto.response.history;


import com.ssafy.stargate.model.entity.History;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class HistoryResponseDto {
    private Long no;
    private String contents;
    private Long memberNo;
    private String email;
    private LocalDateTime createDate;

    public static HistoryResponseDto entityToDto(History history) {
        return HistoryResponseDto.builder()
                .no(history.getNo())
                .memberNo(history.getPMember().getMemberNo())
                .email(history.getFUser().getEmail())
                .contents(history.getContents())
                .createDate(history.getCreateDate())
                .build();
    }
}
