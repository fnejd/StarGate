package com.ssafy.stargate.model.dto.response;

import jakarta.persistence.Entity;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DashboardResponseDto {
    String temp;
//    private
    /*{
        "today" : {
				[
        "uuid" : "미팅고유번호", // [UUID] 미팅 고유 번호
                "name" : "미팅이름", // [String] 미팅이름
                "start_date" : "일시", // [LocalDateTime] 시작 날짜
                "waiting_time" : "남은시간", // [int] 남은 시간
                "image": "url?" // [String] 이미지
				]  // [List<Meeting>] 오늘 있는 미팅 목록
				...
    },
        "future" : {
				[
        "uuid" : "미팅고유번호", // [UUID] 미팅 고유 번호
                "name" : "미팅이름", // [String] 미팅이름
                "start_date" : "일시", // [LocalDateTime] 시작 날짜
                "waiting_time" : "남은시간", // [int] 남은 시간
                "image": "url?" // [String] 이미지
				]  // [List<Meeting>] 예정인 미팅 목록
				...
    },
        "past" : {
				[
        "uuid" : "미팅고유번호", // [UUID] 미팅 고유 번호
                "name" : "미팅이름", // [String] 미팅이름
                "start_date" : "일시", // [LocalDateTime] 시작 날짜
                "image": "url?" // [String] 이미지
				]  // [List<Meeting>] 리마인드 미팅 목록
				...
    }
    }*/
}
