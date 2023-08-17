package com.ssafy.stargate.model.dto.response.file;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SavedFileResponseDto {
    private String filename;
    private String fileUrl;
}
