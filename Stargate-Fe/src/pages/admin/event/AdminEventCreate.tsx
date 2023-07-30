import { useState, ChangeEvent } from 'react';
import MeetingLeftSection from '@/organisms/MeetingLeftSection';
import MeetingRightSection from '@/organisms/MeetingRightSection';
import MeetingBottomSection from '@/organisms/MeetingBottomSection';
import AdminInput from '@/atoms/AdminInput';
import AdminBtn from '@/atoms/AdminBtn';

const AdminEventCreate = () => {
  const [name, setName] = useState<string>('');

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
    console.log(`제목 ${name}`);
  };

  return (
    <div>
      <div className="form-title text-center mb-10">팬사인회 생성</div>
      <div className="mb-8">
        <label htmlFor="제목" className="ml-1 my-2 flex justify-start">
          <span className="font-suit font-medium text-14 text-white">제목</span>
        </label>
        <div className="flex">
          <input
            className="w-450 h-8 text-12 ml-1 mr-1 px-3 py-2 border border-gray-300 rounded-sm bg-white text-black placeholder-pl-5 font-suit focus:outline-none focus:ring-2 focus:ring-mainblue-300 focus:border-transparent"
            type="text"
            placeholder=""
            value={name}
            onChange={handleName}
          />
        </div>
      </div>
      <div className="w-full flex justify-center flex-col">
        <div className="flex">
          <MeetingLeftSection />
          <MeetingRightSection />
        </div>
        <MeetingBottomSection />
      </div>
    </div>
  );
};

export default AdminEventCreate;
