package com.ssafy.stargate.model.dto.response;

import com.ssafy.stargate.model.dto.common.SavedFileDto;
import lombok.*;

import java.util.List;
import java.util.UUID;


@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PolaroidResponseDto {
    private long memberNo; // member

    List<PolaroidDetailDto> polaroids;

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class PolaroidDetailDto {
        private long no;
        private SavedFileDto imageFileInfo;
    }
}