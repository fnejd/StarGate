import { useState, useEffect } from 'react';
import BoardHeader from '@/organisms/board/BoardHeader';
import BoardCardBox from '@/organisms/board/BoardCardBox';
import BoardCardList from '@/organisms/board/BoardCardList';
import { fetchUserBoard } from '@/services/userBoardService';
import { BoardData } from '@/types/board/type';

const UserBoard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BoardData>({
    ongoing: [],
    expected: [],
    finished: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchUserBoard();
      if (fetchedData) {
        setData(fetchedData);
        console.log(fetchedData);
      }
      setLoading(false);
      console.log('로딩완료');
    };
    fetchData();
  }, []);

  /**
   * @param cardBoxData => CardBox에 넣을 data값 선정
   * @param setExpected => CardBox에 Expected[0]이 들어갔는지 확인하는 변수
   */
  const cardBoxData = data.ongoing[0] || data.expected[0];
  const setExpected = cardBoxData === data.expected[0];

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
    <div className="w-xl min-h-screen flex flex-col justify-around">
      <BoardHeader isAdmin={false} />
      {loading ? (
        <BoardCardBox isAdmin={false} isLoading={loading} />
      ) : (
        cardBoxData && (
          <BoardCardBox
            uuid={cardBoxData.uuid}
            imageSrc={cardBoxData.imageFileInfo?.fileUrl}
            title={cardBoxData.name}
            date={cardBoxData.startDate}
            remainingTime={cardBoxData.remainingTime}
            isAdmin={false}
            isLoading={loading}
          />
        )
      )}
      <p className="t3b text-center lg:my-14 sm:my-6 text-white">예정</p>
      {loading ? (
        <BoardCardList isLoading={loading} isAdmin={false} />
      ) : (
        data.expected &&
        (setExpected ? (
          <BoardCardList
            meetings={data.expected.slice(1)}
            isAdmin={false}
            isLoading={loading}
          />
        ) : (
          <BoardCardList
            meetings={data.expected}
            isAdmin={false}
            isLoading={loading}
          />
        ))
      )}
      <p className="t3b text-center lg:my-14 sm:my-6 text-white">리마인드</p>
      {data.finished && (
        <BoardCardList
          meetings={data.finished}
          isAdmin={false}
          isLoading={loading}
          isOver={true}
        />
      )}
    </div>
  );
};

export default UserBoard;
