package com.ssafy.stargate.model.dto.response.postit;

import com.ssafy.stargate.model.entity.Postit;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class PostitResponseDto {
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
    public static PostitResponseDto fromEntity(Postit postit) {
        return PostitResponseDto.builder()
                .no(postit.getNo())
                .fanEmail(postit.getFUser().getEmail())
                .meetingUuid(postit.getMeeting().getUuid())
                .memberNo(postit.getPMember().getMemberNo())
                .contents(postit.getContents())
                .build();
    }

}
