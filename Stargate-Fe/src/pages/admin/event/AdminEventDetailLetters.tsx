import { useEffect, useState, ChangeEvent } from 'react';
import MeetingLeftSection from '@/organisms/event/MeetingLeftSection';
import MeetingRightSection from '@/organisms/event/MeetingRightSection';
import MeetingBottomSection from '@/organisms/event/MeetingBottomSection';
import BtnBlue from '@/atoms/common/BtnBlue';
import { fetchEventDetailData } from '@/services/adminEvent';
import BoardHeaderNav from '@/atoms/board/BoardHeaderNav';
import { useNavigate } from 'react-router-dom';

interface ImageFileInfo {
  filename: string;
  fileUrl: string;
}

interface MeetingFUser {
  email: string;
  orderNum: number;
  isRegister: string;
  name: string;
}

interface MeetingMember {
  memberNo: number;
  name: string;
  orderNum: number;
  roomId: string;
}

interface MeetingData {
  uuid: string;
  name: string;
  startDate: string;
  waitingTime: number;
  meetingTime: number;
  notice: string;
  photoNum: number;
  groupNo: number;
  groupName: string;
  imageFileInfo: ImageFileInfo;
  meetingFUsers: MeetingFUser[];
  meetingMembers: MeetingMember[];
}

const AdminEventDetail = () => {
  const [group, setGroup] = useState<[]>([]);
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
  const navigate = useNavigate();

  // 미팅 디테일 가져오기
  useEffect(() => {
    const fetchEventDetail = async () => {
      const currentUrl = window.location.href;
      const parts = currentUrl.split('/');
      const uuid = parts[parts.length - 1];
      console.log(uuid);

      const fetchedData = await fetchEventDetailData(uuid);
      if (fetchedData) {
        setData(fetchedData);
        console.log('데이터는', fetchedData);
      }
      console.log('로딩완료', location);
    };
    fetchEventDetail();
  }, []);

  const handleCheck = () => {
    navigate('/admin/board');
  };

  return (
    <div>
      <BoardHeaderNav isAdmin={true}></BoardHeaderNav>
      <div className="my-10 text-center form-title">{data.name}</div>
      <div className="mb-8">
        <label htmlFor="제목" className="flex justify-start my-2 ml-1">
          <span className="font-medium text-white font-suit text-14">제목</span>
        </label>
        <div className="flex">
          <input
            className="h-8 px-3 py-2 ml-1 mr-1 text-black bg-white border border-gray-300 rounded-sm w-450 text-12 placeholder-pl-5 font-suit focus:outline-none focus:ring-2 focus:ring-mainblue-300 focus:border-transparent"
            type="text"
            placeholder=""
            value={data.name}
            // onChange={handleName}
          />
        </div>
      </div>
      {/* <div className="flex flex-col justify-center w-full">
        <div className="flex">
          <MeetingLeftSection formData={formData} setFormData={setFormData} />
          <MeetingRightSection formData={formData} setFormData={setFormData} />
        </div>
        <MeetingBottomSection
          formData={formData}
          setFormData={setFormData}
          group={group}
          setGroup={setGroup}
        />
      </div> */}
      <div className="mx-8 my-20 text-center">
        <BtnBlue text="확인" onClick={handleCheck} />
      </div>
    </div>
  );
};

export default AdminEventDetail;
