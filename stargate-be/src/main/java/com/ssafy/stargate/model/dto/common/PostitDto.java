package com.ssafy.stargate.model.dto.common;

import com.ssafy.stargate.model.entity.Postit;
import lombok.*;

import java.util.UUID;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PostitDto {
    private long no;
    private String fanEmail;
    private long memberNo;
    private UUID meetingUuid;
    private String contents;

    /**
     * Postit Entity를 PostitDto으로 변환한다.
     * @param postit 포스트잇 엔티티 객체
     * @return dto으로 변환된 PostitDto 객체
     */
    public static PostitDto fromEntity(Postit postit) {
        return PostitDto.builder()
                .no(postit.getNo())
                .fanEmail(postit.getFUser().getEmail())
                .meetingUuid(postit.getMeeting().getUuid())
                .memberNo(postit.getPMember().getMemberNo())
                .contents(postit.getContents())
                .build();
    }

}
