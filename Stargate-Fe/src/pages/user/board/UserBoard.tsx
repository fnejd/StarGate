import { useState, useEffect } from 'react';
import BoardHeader from '@/organisms/board/BoardHeader';
import BoardCardBox from '@/organisms/board/BoardCardBox';
import BoardCardList from '@/organisms/board/BoardCardList';
import { fetchUserBoard } from '@/services/userBoardService';

interface ImageFileInfo {
  filename: string;
  fileUrl: string;
}

interface MeetingData {
  uuid: string;
  name: string;
  startDate: string;
  remainingTime: string;
  imageFileInfo: ImageFileInfo;
}

interface AdminBoardData {
  ongoing: MeetingData[];
  expected: MeetingData[];
  finished: MeetingData[];
}

const UserBoard = () => {
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
  }, []);
  const cardData = data.ongoing[0] || data.expected[0];

  return (
    <div className="w-xl h-screen">
      <BoardHeader />
      {cardData && (
        <BoardCardBox
          uuid={cardData.uuid}
          imageSrc={cardData.imageFileInfo.fileUrl}
          title={cardData.name}
          date={cardData.startDate}
          time={cardData.remainingTime}
          isAdmin={true}
        />
      )}
      <p className="t3b text-center lg:my-14 sm:my-6 text-white">예정</p>
      <BoardCardList meetings={data.expected.slice(1)} isAdmin={false} isOver={false} />
      <p className="t3b text-center lg:my-14 sm:my-6 text-white">리마인드</p>
      <BoardCardList meetings={data.finished} isAdmin={false} isOver={true}/>
    </div>
  );
};

export default UserBoard;
