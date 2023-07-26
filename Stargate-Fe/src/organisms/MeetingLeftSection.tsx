import React, { useState, useRef } from 'react';
import AdminBtn from '@/atoms/AdminBtn.tsx';
import AdminInput from '@/atoms/AdminInput.tsx';
import DropDown from '@/atoms/DropDown.tsx';
import useDropdown from '@/hooks/useDropdown.tsx';

const MeetingLeftSection = () => {
  const [picSec, setPicSec] = useState<number>(40);
  const [totalSec, setTotalSec] = useState<number>(80);
  const [numbers, setNumbers] = useState<number[]>([4]);

  const setTotalTime: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newTime: number = parseInt(event.currentTarget.value, 10);
    setTotalSec(newTime);
    console.log(`전체 미팅 시간은 ${newTime}초`);
  
    const cnt = Math.floor(newTime / 2 / 10);
    console.log(`컷 수는 ${cnt}`);

    let newNumbers: number[] = [4];

    newNumbers = Array.from({ length: cnt - 4 }, (_, index) => 4 + index);
    setNumbers(newNumbers);
  };

  console.log(numbers);

  const handlePicSecChange = (value: number) => {
    setPicSec(value * 10);
  };

  return (
    <>
      <AdminInput labelFor="시작날짜" type="date" placeholder="" />

      <div className="flex items-end">
        <AdminInput labelFor="다음 통화까지 대기시간" type="number" placeholder="10" min="5" max="60" step="5" />
        <p className="font-suit font-medium text-14 text-white p-1 pl-2">초</p>
      </div>

      <div className="flex items-end">
        <AdminInput labelFor="총 미팅 시간" type="text" placeholder="80" onChange={setTotalTime} />
        <p className="font-suit font-medium text-14 text-white p-1 pl-2">초</p>
      </div>

      <div className="w-48 h-8 leading-8 mx-1 mt-4 font-suit font-semibold text-14 text-white text-left">{"사진 촬영"}</div>
      <div className="h-8 flex items-center">
        <div className="flex mx-1 my-2 font-suit font-medium text-14 text-white">촬영 컷 수</div>
        <p className="input-warning leading-8 ml-1">한 컷당 촬영 시간은 10초 입니다</p>
      </div>

      <div className="flex items-end">
        <DropDown numbers={numbers} onOptionChange={handlePicSecChange}/>
        <p className="font-suit font-medium text-14 text-white p-1 pl-2">컷</p>
      </div>
      <div className="mx-1 my-2 font-suit font-medium text-14 text-white">
        한 멤버당 미팅 시간은 사인회 시간 {totalSec - picSec} 초와 촬영 시간 {picSec} 초를 더한 {totalSec} 초 입니다
      </div>
    </>
  );
};

export default MeetingLeftSection;
