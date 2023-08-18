import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BoardCardBox from '@/organisms/board/BoardCardBox';
import BoardCardList from '@/organisms/board/BoardCardList';
import { fetchAdminBoard } from '@/services/adminBoardService';
import PlusButton from '@/atoms/board/PlusMinusButton';
import BoardHeader from '@/organisms/board/BoardHeader';
import { BoardData } from '@/types/board/type';

const AdminBoard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BoardData>({
    ongoing: [],
    expected: [],
    finished: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log('로딩중');
      const fetchedData = await fetchAdminBoard();
      if (fetchedData) {
        setData(fetchedData);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  /**
   * @param cardBoxData => CardBox에 넣을 data값 선정
   * @param setExpected => CardBox에 Expected[0]이 들어갔는지 확인하는 변수
   * @param isExpected => 출력할 expected값이 있는지 확인하는 변수
   * @param isFinished => 출력할 finished값이 있는지 확인하는 변수
   */
  const cardBoxData = data.ongoing[0] || data.expected[0];
  const setExpected = cardBoxData === data.expected[0];
  const isExpected =
    (setExpected && data.expected[1] !== undefined) ||
    (setExpected === false && data.expected[0] !== undefined);
  const isFinished = data.finished[0] !== undefined;

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
    <div className="flex flex-col justify-around min-h-screen bg-no-repeat bg-cover w-xl bg-gradient-to-b from-mainblue to-mainyellow">
      <BoardHeader isAdmin={true} />
      {loading ? (
        <BoardCardBox isAdmin={true} isLoading={loading} />
      ) : (
        cardBoxData && (
          <BoardCardBox
            uuid={cardBoxData.uuid}
            imageSrc={cardBoxData.imageFileInfo?.fileUrl}
            title={cardBoxData.name}
            date={cardBoxData.startDate}
            remainingTime={cardBoxData.remainingTime}
            isAdmin={true}
            isLoading={loading}
          />
        )
      )}
      <Link to="/admin/event/create" className="fixed right-5 bottom-5 z-50">
        <PlusButton />
      </Link>
      {isExpected ? (
        <p className="t3b text-center lg:my-14 sm:my-6 text-white">예정</p>
      ) : (
        <p className="t3b text-center lg:my-14 sm:my-6 text-white opacity-40">
          예정 없음
        </p>
      )}
      {loading ? (
        <BoardCardList isLoading={loading} isAdmin={true} />
      ) : (
        data.expected &&
        (setExpected ? (
          <BoardCardList
            meetings={data.expected.slice(1)}
            isAdmin={true}
            isLoading={loading}
          />
        ) : (
          <BoardCardList
            meetings={data.expected}
            isAdmin={true}
            isLoading={loading}
          />
        ))
      )}
      {isFinished ? (
        <p className="t3b text-center lg:my-14 sm:my-6 text-white">리마인드</p>
      ) : (
        <p className="t3b text-center lg:my-14 sm:my-6 text-white opacity-40">
          리마인드 없음
        </p>
      )}
      {data.finished && (
        <BoardCardList
          meetings={data.finished}
          isAdmin={true}
          isLoading={loading}
          isOver={true}
        />
      )}
    </div>
  );
};

export default AdminBoard;
