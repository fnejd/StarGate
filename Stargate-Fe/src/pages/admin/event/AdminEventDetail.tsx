import { useEffect, useState } from 'react';
import MeetingLeftDetail from '@/organisms/event/MeetingLeftDetail';
import MeetingRightDetail from '@/organisms/event/MeetingRightDetail';
import MeetingBottomDetail from '@/organisms/event/MeetingBottomDetail';
import BtnBlue from '@/atoms/common/BtnBlue';
import { fetchEventDetailData } from '@/services/adminEvent';
import BoardHeaderNav from '@/atoms/board/BoardHeaderNav';
import { Link } from 'react-router-dom';
import { MeetingData } from '@/types/event/type';
import LettersModalBox from '@/organisms/event/LettersModalBox';

const AdminEventDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOver, setIsOver] = useState<boolean>(false);
  const [data, setData] = useState<MeetingData>({
    uuid: '',
    name: '',
    startDate: '',
    waitingTime: 10,
    meetingTime: 80,
    notice: '',
    photoNum: 0,
    groupNo: 0,
    groupName: '',
    imageFileInfo: {
      filename: '',
      fileUrl: '',
    },
    meetingFUsers: [],
    meetingMembers: [],
  });
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  // 미팅 디테일 가져오기
  useEffect(() => {
    const fetchEventDetail = async () => {
      const currentUrl = window.location.href;
      const parts = currentUrl.split('/');
      const uuid = parts[parts.length - 1];

      const fetchedData = await fetchEventDetailData(uuid);
      if (fetchedData) {
        setData(fetchedData);
        setLoading(false);
      }
    };
    fetchEventDetail();
  }, []);

  useEffect(() => {
    if (data.startDate) {
      const currentDateTime = new Date();
      const startDateTime = new Date(data.startDate);
      const isBeforeStartDate = startDateTime < currentDateTime;
      setIsOver(isBeforeStartDate);
    }
  }, [data.startDate]);

  return (
    <div className="flex w-xl flex-col items-center">
      <BoardHeaderNav isAdmin={true}></BoardHeaderNav>
      <div className="my-10 text-center form-title">{data.name}</div>
      <div className="mb-8 w-full flex justify-end">
        {isModalOpen && (
          <LettersModalBox
            isOpen={isModalOpen}
            onClose={handleModalClose}
            uuid={data.uuid}
          />
        )}
        <div className="flex flex-col w-5/12 h-full">
          {loading === false && <MeetingLeftDetail formData={data} />}
          <div className="my-4"></div>
          {loading === false && <MeetingBottomDetail formData={data} />}
        </div>
        <div className="flex w-5/12">
          {loading === false && <MeetingRightDetail formData={data} />}
        </div>
      </div>
      <div className="flex w-full justify-end">
        <div className="flex w-5/6"></div>
      </div>
      <div className="flex justify-evenly w-s my-20 text-center">
        {isOver ? (
          <BtnBlue text="편지 리스트" onClick={handleModalOpen} />
        ) : (
          <Link
            to="/admin/event/create"
            state={{ uuid: data.uuid, type: true }}
          >
            <BtnBlue text="수정" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default AdminEventDetail;
