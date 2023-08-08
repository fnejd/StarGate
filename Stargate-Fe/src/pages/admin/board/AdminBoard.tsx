import { useState, useEffect } from 'react';
import AdminBoardHeader from '@/organisms/board/AdminBoardHeader';
import BoardCardBox from '@/organisms/board/BoardCardBox';
import BoardCardList from '@/organisms/board/BoardCardList';
import { fetchAdminBoard } from '@/services/adminBoardService';

interface ImageFileInfo {
  filename: string;
  fileUrl: string;
}

interface MeetingData {
  uuid: string;
  name: string;
  startDate: string;
  remainingTime: number;
  imageFileInfo?: ImageFileInfo;
}

interface AdminBoardData {
  ongoing: MeetingData[];
  expected: MeetingData[];
  finished: MeetingData[];
}

const AdminBoard = () => {
  const [data, setData] = useState<AdminBoardData>({
    ongoing: [],
    expected: [],
    finished: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchAdminBoard();
      if (fetchedData) {
        setData(fetchedData);
      }
    };
    fetchData();
  }, []);

  const cardData = data.ongoing[0] || data.expected[0];

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
    }, 1000);

    return () => clearInterval(interval); 
  }, [data]);

  return (
    <div className="w-xl h-screen">
      <AdminBoardHeader />
      {cardData && (
        <BoardCardBox
          uuid={cardData.uuid}
          imageSrc={cardData.imageFileInfo?.fileUrl}
          title={cardData.name}
          date={cardData.startDate}
          remainingTime={cardData.remainingTime}
          isAdmin={true}
        />
      )}
      <p className="t3b text-center lg:my-14 sm:my-6 text-white">예정</p>
      <BoardCardList meetings={data.expected.slice(1)} isAdmin={true} />
      <p className="t3b text-center lg:my-14 sm:my-6 text-white">리마인드</p>
      <BoardCardList meetings={data.finished} isAdmin={true} />
    </div>
  );
};

export default AdminBoard;
