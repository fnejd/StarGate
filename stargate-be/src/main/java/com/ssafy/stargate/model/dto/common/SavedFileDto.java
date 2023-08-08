package com.ssafy.stargate.model.dto.common;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SavedFileDto {
    private String filename;
    private String fileUrl;
}
