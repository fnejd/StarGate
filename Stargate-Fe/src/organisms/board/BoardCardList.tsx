import React from 'react';
import BoardCard from '../../atoms/board/BoardCard';
import { useNavigate } from 'react-router-dom';
/**
 * BoardCardListProps
 * @param meetings => 통째로 넘겨받은 meeting data
 */

interface BoardCardListProps {
  meetings: MeetingData[];
  isAdmin: boolean;
  isOver?: boolean;
}

/**
 * MeetingData
 * @param uuid => 사인회 고유번호
 * @param name => Card flip시 보여줄 사인회 제목
 * @param start_date => Card flip시 보여줄 사인회 날짜
 * @param waiting_time => Card flip시 보여줄 남은 시간
 * @param imageFileInfo => 이미지 api 주소
 */

interface MeetingData {
  uuid: string;
  name: string;
  startDate: string;
  remainingTime?: string;
  imageFileInfo?: imageFileInfo;
}

interface imageFileInfo {
  filename: string;
  fileUrl: string;
}

const BoardCardList = (
  { meetings }: BoardCardListProps,
  isAdmin: boolean,
  isOver?: boolean
) => {
  const navigate = useNavigate();
  const remainder = meetings.length % 4;
  const emptyCardCount = remainder === 0 ? 0 : 4 - remainder;

  /**
   * remainder에 전체 미팅 길이를 나눈 나머지를 넣어주고
   * emptyCardCount에 얼마나 빈 div태그를 넣어야하는지 확인 후
   * 그 숫자만큼 빈 태그을 출력해줌
   */

  const handleCardClick = (uuid: string) => {
    navigate(`/remind/${uuid}`); // navigate 함수를 사용하여 원하는 경로로 이동합니다.
    if (isAdmin) {
      linkToDetail(uuid);
    } else {
      if (isOver) {
        linkToRemind(uuid);
      }
    }
  };
  const linkToRemind = (uuid: string) => {
    navigate(`/admin/event/detail/${uuid}`);
  };
  const linkToDetail = (uuid: string) => {
    navigate(`/remind/${uuid}`);
  };

  return (
    <div className="w-98vw h-5/6 lg:h-96 sm:h-56 flex justify-center">
      <div className="w-5/6 flex justify-evenly flex-wrap">
        {meetings.map((meeting) => (
          <div
            className="w-1/4 h-full cursor-pointer" // 커서를 포인터로 변경합니다.
            key={meeting.uuid}
            onClick={() => handleCardClick(meeting.uuid)} // 카드 클릭 시 handleCardClick 함수를 호출합니다.
          >
            <BoardCard
              imageSrc={meeting.imageFileInfo?.fileUrl}
              title={meeting.name}
              date={meeting.startDate}
              {...(meeting.remainingTime && { time: meeting.remainingTime })}
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
