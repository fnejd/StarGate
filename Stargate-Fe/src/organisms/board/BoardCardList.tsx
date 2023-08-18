import BoardCard from '../../atoms/board/BoardCard';
import { useNavigate } from 'react-router-dom';
import { ImageFileInfo } from '@/types/board/type';

/**
 * BoardCardListProps
 * @param meetings => 통째로 넘겨받은 meeting data
 */

interface BoardCardListProps {
  meetings?: MeetingData[];
  isAdmin?: boolean;
  isLoading: boolean;
  isOver?: boolean;
}

/**
 * MeetingData
 * @param uuid => 사인회 고유번호
 * @param name => Card flip시 보여줄 사인회 제목
 * @param start_date => Card flip시 보여줄 사인회 날짜
 * @param remainingTime => Card flip시 보여줄 남은 시간
 * @param imageFileInfo => 이미지 api 주소
 */

interface MeetingData {
  uuid: string;
  name: string;
  startDate: string;
  remainingTime?: number;
  imageFileInfo?: ImageFileInfo;
}

const BoardCardList = ({
  meetings,
  isAdmin,
  isLoading,
  isOver = false,
}: BoardCardListProps & {
  isAdmin: boolean;
  isLoading: boolean;
  isOver?: boolean;
}) => {
  const navigate = useNavigate();
  const remainder = meetings === undefined ? 0 : meetings.length % 4;
  const emptyCardCount = remainder === 0 ? 0 : 4 - remainder;
  const skeleton = 8;

  /**
   * remainder에 전체 미팅 길이를 나눈 나머지를 넣어주고
   * emptyCardCount에 얼마나 빈 div태그를 넣어야하는지 확인 후
   * 그 숫자만큼 빈 태그을 출력해줌
   */

  const handleCardClick = (uuid: string) => {
    if (isAdmin) {
      linkToDetail(uuid);
    } else {
      if (isOver) {
        linkToRemind(uuid);
      }
    }
  };
  const linkToRemind = (uuid: string) => {
    navigate(`/remind/${uuid}`);
  };
  const linkToDetail = (uuid: string) => {
    navigate(`/admin/event/detail/${uuid}`);
  };

  return (
    <div className="w-xl flex justify-center">
      {isLoading ? (
        <div className="w-5/6 flex justify-evenly flex-wrap">
          {Array.from({ length: skeleton }).map((_, index) => (
            <div key={index} className="w-1/4 lg:h-96 sm:h-56">
              <BoardCard isLoading={isLoading} />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-5/6 flex justify-evenly flex-wrap">
          {meetings &&
            meetings.map((meeting) => (
              <div
                className="w-1/4 flex justify-center lg:h-96 sm:h-56 cursor-pointer"
                key={meeting.uuid}
                onClick={() => handleCardClick(meeting.uuid)}
              >
                <BoardCard
                  imageSrc={meeting.imageFileInfo?.fileUrl}
                  title={meeting.name}
                  date={meeting.startDate}
                  {...(meeting.remainingTime && {
                    time: meeting.remainingTime,
                  })}
                  isLoading={isLoading}
                />
              </div>
            ))}
          {Array.from({ length: emptyCardCount }).map((_, index) => (
            <div key={index} className="w-1/4 lg:h-96 sm:h-56"></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardCardList;
