import { useEffect, useState, ChangeEvent } from 'react';
import MeetingLeftSection from '@/organisms/event/MeetingLeftSection';
import MeetingRightSection from '@/organisms/event/MeetingRightSection';
import MeetingBottomSection from '@/organisms/event/MeetingBottomSection';
import BtnBlue from '@/atoms/common/BtnBlue';
import {
  createEvent,
  fetchEventDetailData,
  updateEvent,
} from '@/services/adminEvent';
import { fetchGroup } from '@/services/adminBoardService';
import BoardHeaderNav from '@/atoms/board/BoardHeaderNav';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
interface MeetingFUser {
  no: number;
  email: string;
  orderNum: number;
  isRegister: string;
  name: string;
}

interface MeetingMember {
  no: number;
  memberNo: number;
  orderNum: number;
  roomId: string;
}

interface GroupMember {
  memberNo: number;
  name: string;
}

interface Group {
  groupNo: number;
  members: GroupMember[];
}

interface FormData {
  name: string | null;
  startDate: Date | String | null; // null로 초기화하여 값을 비워놓을 수 있도록 함
  waitingTime: number;
  meetingTime: number;
  notice: string;
  photoNum: number;
  imageFile: File | null;
  // starName: string;
  meetingFUsers: string;
  meetingMembers: string;
}

const AdminEventCreate = () => {
  const [group, setGroup] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
  const [formData, setFormData] = useState<FormData>({
    name: null,
    startDate: null,
    waitingTime: 10,
    meetingTime: 80,
    photoNum: 0,
    notice: '',
    imageFile: null,
    meetingFUsers: '',
    meetingMembers: '',
  });
  const navigate = useNavigate();
  const localLocation = useLocation();
  const uuid = localLocation.state?.uuid;
  // AdminEventDetail 에서 uuid 갖고 넘어올 땐 true 가지고 옴
  const type = localLocation.state?.type === true ? true : false;

  // 그룹명, 그룹멤버 데이터 가져오기
  useEffect(() => {
    const getGroup = async () => {
      const data = await fetchGroup();
      console.log('데이터', data);
      setGroup(data);
      console.log(group);
    };
    getGroup();
  }, []);

  console.log('폼데이터', formData);

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: value,
    }));
    console.log(`제목 ${formData.name}`);
  };

  const handleFormDataChange = (data: FormData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      data,
    }));
  };

  // API로 데이터 전송
  const handleCreateEvent = async () => {
    if (formData) {
      // MeetingLeftSection에서 받은 formData와 AdminEventCreate의 formData를 합침
      // const mergedFormData = { ...formData, ...eventData };
      try {
        console.log(formData);
        if (type) {
          await updateEvent(formData, uuid);
          Swal.fire('수정 완료', '이벤트 수정 완료!', 'success');
        } else {
          await createEvent(formData);
          Swal.fire('생성 완료', '이벤트 생성 완료!', 'success');
        }
        console.log('이벤트 전송 성공');
        navigate('/admin/board');
      } catch (error) {
        console.error('이벤트 전송 실패:', error);
      }
    }
  };

  return (
    <div className="w-xl flex flex-col items-center">
      <BoardHeaderNav isAdmin={true}></BoardHeaderNav>
      <div className="my-10 text-center form-title">팬사인회 생성</div>
      <div className="w-full flex justify-end">
        <div className="flex flex-col w-5/12 justify-end">
          <label htmlFor="제목" className="my-2 ml-1">
            <span className="font-medium text-white font-suit text-14">
              제목
            </span>
          </label>
          <div className="flex mb-5">
            <input
              className="h-8 px-3 py-2 ml-1 mr-1 text-black bg-white border border-gray-300 rounded-sm w-4/5 text-12 placeholder-pl-5 font-suit focus:outline-none focus:ring-2 focus:ring-mainblue-300 focus:border-transparent"
              type="text"
              placeholder=""
              value={formData.name}
              onChange={handleName}
            />
          </div>
          <MeetingLeftSection formData={formData} setFormData={setFormData} />
          <div className="flex">
            <MeetingBottomSection
              formData={formData}
              setFormData={setFormData}
              group={group}
              setGroup={setGroup}
            />
          </div>
        </div>

        <div className="flex w-5/12 mt-32">
          <MeetingRightSection formData={formData} setFormData={setFormData} />
        </div>
      </div>
      <div className="flex justify-evenly w-m mx-8 my-20 text-center">
        <BtnBlue text="확인" onClick={handleCreateEvent} />
      </div>
    </div>
  );
};

export default AdminEventCreate;
