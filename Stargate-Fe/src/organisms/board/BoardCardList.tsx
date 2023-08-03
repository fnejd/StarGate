import React from 'react';
import BoardCard from '../../atoms/board/BoardCard';

/**
 * BoardCardListProps
 * @param meetings => 통째로 넘겨받은 meeting data
 */

interface BoardCardListProps {
  meetings: MeetingData[];
}

/**
 * MeetingData
 * @param uuid => 사인회 고유번호
 * @param name => Card flip시 보여줄 사인회 제목
 * @param start_date => Card flip시 보여줄 사인회 날짜
 * @param waiting_time => Card flip시 보여줄 남은 시간
 * @param image => 이미지 api 주소
 */

interface MeetingData {
  uuid: string;
  name: string;
  start_date: string;
  waiting_time?: string;
  image: string;
}

const BoardCardList = ({ meetings }: BoardCardListProps) => {
  const remainder = meetings.length % 4;
  const emptyCardCount = remainder === 0 ? 0 : 4 - remainder;

  /**
   * remainder에 전체 미팅 길이를 나눈 나머지를 넣어주고
   * emptyCardCount에 얼마나 빈 div태그를 넣어야하는지 확인 후
   * 그 숫자만큼 빈 태그을 출력해줌
   */

  return (
    <div className="w-98vw h-5/6 lg:h-96 sm:h-56 flex justify-center">
      <div className="w-5/6 flex justify-evenly flex-wrap">
        {meetings.map((meeting) => (
          <div className="w-1/4 h-full" key={meeting.uuid}>
            <BoardCard
              imageSrc={meeting.image}
              title={meeting.name}
              date={meeting.start_date}
              {...(meeting.waiting_time && { time: meeting.waiting_time })}
            />
          </div>
        ))}
        {Array.from({ length: emptyCardCount }).map((_, index) => (
          <div key={index} className="w-1/4 h-full"></div>
        ))}
      </div>
    </div>
  );
};

export default BoardCardList;
