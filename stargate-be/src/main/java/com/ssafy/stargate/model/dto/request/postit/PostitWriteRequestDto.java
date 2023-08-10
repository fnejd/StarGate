package com.ssafy.stargate.model.dto.request.postit;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class PostitWriteRequestDto {
    private UUID uuid;
    private String email;
    List<PostitDatas> postitDatas;

    @Getter
    public static class PostitDatas {
        private long memberNo;
        private String postitContents;
    }
}
