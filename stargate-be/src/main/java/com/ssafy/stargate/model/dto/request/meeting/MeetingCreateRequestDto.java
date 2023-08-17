package com.ssafy.stargate.model.dto.request.meeting;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.stargate.exception.ParsingException;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
public class MeetingCreateRequestDto {
    private String name;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime startDate;
    private int waitingTime;
    private int meetingTime;
    private int photoNum;
    private String notice;
    private String meetingFUsers;
    private String meetingMembers;

    /**
     * Json형식의 미팅 팬 유저 리스트 문자열을 리스트로 객체 리스트로 파싱한다.
     * 리스트에는 팬유저 이메일(id)가 포함됨
     *
     * @param meetingFUsers [String] Json형식의 미팅 팬 유저 리스트 문자열
     * @return [List<String>] 파싱한 객체 리스트
     * @throws ParsingException 파싱에 실패
     */
    public static List<String> getParsedMeetingFUsers(String meetingFUsers) throws ParsingException {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(meetingFUsers, new TypeReference<List<String>>() {
            });
        } catch (Exception e) {
            throw new ParsingException("MeetingFUsers의 JSON 형태의 문자열을 파싱하는데 실패했습니다.");
        }
    }

    /**
     * Json형식의 미팅 멤버 리스트 문자열을 리스트로 객체 리스트로 파싱한다.
     * 리스트에는 멤버 번호(id)가 포함됨
     *
     * @param meetingMembers [String] Json형식의 미팅 멤버 리스트 문자열
     * @return 파싱한 객체 리스트
     * @throws ParsingException 파싱에 실패
     */
    public static List<Long> getParsedMeetingMembers(String meetingMembers) throws ParsingException {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(meetingMembers, new TypeReference<List<Long>>() {
            });
        } catch (Exception e) {
            throw new ParsingException("MeetingFMembers의 JSON 형태의 문자열을 파싱하는데 실패했습니다.");
        }
    }
}
