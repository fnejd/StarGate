import { useState, ChangeEvent } from 'react';
import MeetingLeftSection from '@/organisms/MeetingLeftSection';
import MeetingRightSection from '@/organisms/MeetingRightSection';
import MeetingBottomSection from '@/organisms/MeetingBottomSection';
import BtnBlue from '@/atoms/BtnBlue';
import createEvent from '@/services/event';

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

interface FormData {
  name: string;
  startDate: Date | null; // null로 초기화하여 값을 비워놓을 수 있도록 함
  waitingTime: number;
  meetingTime: number;
  notice: string;
  photoNum: number;
  image: File | null;
  starName: string;
  meetingFUsers: MeetingFUser[];
  meetingMembers: MeetingMember[];
}

const AdminEventCreate = () => {
  // const [name, setName] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    startDate: null,
    waitingTime: 10,
    meetingTime: 80,
    photoNum: 0,
    notice: '',
    image: null,
    starName: '',
    meetingFUsers: [],
    meetingMembers: [],
  });

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
  const handleCreateEvent = () => {
    if (formData) {
      // MeetingLeftSection에서 받은 formData와 AdminEventCreate의 formData를 합침
      // const mergedFormData = { ...formData, ...eventData };
      console.log(formData);
      // 합친 formData를 createEvent 함수에 전달
      // createEvent(formData);
    }
  };

  return (
    <div>
      <div className="form-title text-center my-10">팬사인회 생성</div>
      <div className="mb-8">
        <label htmlFor="제목" className="ml-1 my-2 flex justify-start">
          <span className="font-suit font-medium text-14 text-white">제목</span>
        </label>
        <div className="flex">
          <input
            className="w-450 h-8 text-12 ml-1 mr-1 px-3 py-2 border border-gray-300 rounded-sm bg-white text-black placeholder-pl-5 font-suit focus:outline-none focus:ring-2 focus:ring-mainblue-300 focus:border-transparent"
            type="text"
            placeholder=""
            value={formData.name}
            onChange={handleName}
          />
        </div>
      </div>
      <div className="w-full flex justify-center flex-col">
        <div className="flex">
          <MeetingLeftSection formData={formData} setFormData={setFormData} />
          <MeetingRightSection formData={formData} setFormData={setFormData} />
        </div>
        <MeetingBottomSection />
      </div>
      <div className="mx-8 my-20 text-center">
        <BtnBlue text="확인" onClick={handleCreateEvent} />
      </div>
    </div>
  );
};

export default AdminEventCreate;
