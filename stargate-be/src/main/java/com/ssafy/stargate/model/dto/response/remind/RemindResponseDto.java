package com.ssafy.stargate.model.dto.response.remind;

import com.ssafy.stargate.model.dto.response.file.SavedFileResponseDto;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RemindResponseDto {
    private UUID uuid; // 미팅
    private String name;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime startDate;
    private long groupNo;
    private String groupName;
    private List<MeetingMemberDto> meetingMembers;

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class MeetingMemberDto {
        private long memberNo;
        private String name;
        private List<PolaroidDto> polaroids;
        private LetterDto letter;
    }

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class PolaroidDto {
        private long no;
        private SavedFileResponseDto imageFileInfo;
    }

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class LetterDto {
        private long no;
        private String contents;
        private LocalDateTime createDate;
        private LocalDateTime editDate;
    }


}