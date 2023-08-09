import { useState, useEffect } from 'react';
import BoardHeader from '@/organisms/board/BoardHeader';
import BoardCardBox from '@/organisms/board/BoardCardBox';
import BoardCardList from '@/organisms/board/BoardCardList';
import { fetchUserBoard } from '@/services/userBoardService';

interface ImageFileInfo {
  filename: string;
  fileUrl: string;
}

/**
 * @param uuid => 미팅 구분할 uuid
 * @param remainingTime => 남은 시간(초)
 * @param imageFileInfo => 이미지 정보
 */
interface MeetingData {
  uuid: string;
  name: string;
  startDate: string;
  remainingTime: number;
  imageFileInfo?: ImageFileInfo;
}

/**
 * @param ongoing => 진행중
 * @param expected => 예정
 * @param finished => 완료
 */
interface AdminBoardData {
  ongoing: MeetingData[];
  expected: MeetingData[];
  finished: MeetingData[];
}

const UserBoard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AdminBoardData>({
    ongoing: [],
    expected: [],
    finished: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchUserBoard();
      if (fetchedData) {
        setData(fetchedData);
      }
    };
    fetchData();
    setLoading(false);
    console.log('로딩완료')
  }, []);
  const cardData = data.ongoing[0] || data.expected[0];

  /**
   * @todo => 추후에 useInterval로 수정
   */

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => ({
        ...prevData,
        ongoing: prevData.ongoing.map((meeting) => {
          if (meeting.remainingTime > 0) {
            return {
              ...meeting,
              remainingTime: meeting.remainingTime - 1,
            };
          }
          return meeting;
        }),
        expected: prevData.expected.map((meeting) => {
          if (meeting.remainingTime > 0) {
            return {
              ...meeting,
              remainingTime: meeting.remainingTime - 1,
            };
          }
          return meeting;
        }),
      }));
    }, 1000); // 1초에 1씩 줄어듬

    return () => clearInterval(interval); // 메모리 누수 방지를 위해 clearInterval
  }, [data]);

  return (
    <div className="w-xl flex flex-col justify-center">
      <BoardHeader />
      {loading ? (
        <BoardCardBox
          isAdmin={false}
          isLoading={loading}
        />
      ) : (
        cardData && <BoardCardBox
          uuid={cardData.uuid}
          imageSrc={cardData.imageFileInfo?.fileUrl}
          title={cardData.name}
          date={cardData.startDate}
          remainingTime={cardData.remainingTime}
          isAdmin={false}
          isLoading={loading}
        />
      )}
      <p className="t3b text-center lg:my-14 sm:my-6 text-white">예정</p>
      {loading ? (
        <BoardCardList isLoading={loading} isAdmin={false} />
      ) : (
        data.expected[1] && <BoardCardList
          meetings={data.expected.slice(1)}
          isAdmin={false}
          isLoading={loading}
        />
      )}
      <p className="t3b text-center lg:my-14 sm:my-6 text-white">리마인드</p>
      {data.finished && <BoardCardList
        meetings={data.finished}
        isAdmin={false}
        isLoading={loading}
      />} 
    </div>
  );
};

export default UserBoard;
