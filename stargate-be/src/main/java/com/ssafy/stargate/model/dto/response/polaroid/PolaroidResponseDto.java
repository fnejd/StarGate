package com.ssafy.stargate.model.dto.response.polaroid;

import com.ssafy.stargate.model.dto.response.file.SavedFileResponseDto;
import lombok.*;

import java.util.List;


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
        private SavedFileResponseDto imageFileInfo;
    }
}