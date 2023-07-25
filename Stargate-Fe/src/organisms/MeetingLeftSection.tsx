import React, {useState, useRef } from 'react';
import AdminBtn from '@/atoms/AdminBtn.tsx'
import AdminInput from '@/atoms/AdminInput.tsx'
import DropDown from '@/atoms/DropDown.tsx'
import useDropdown from '@/hooks/useDropdown.tsx';

const MeetingLeftSection: React.FC = () => {
  const [picSec, setPicSec] = useState<number>(40);
  const [totalSec, setTotalSec] = useState<number>(80);
  const [numbers, setNumbers] = useState<number[]>([4]);
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const [endNum, setEndNum] = useState<number>(0);
 
  const openSelectDropdown = () => {
    selectRef.current?.click();
  };

  const handleSelectChange = () => {
    const start = 4;
    let newNumbers:number[] = [4];
    
    if (selectRef.current) {
      const selectedValue = Number(selectRef.current.value);
      setEndNum(selectedValue);
      setPicSec(selectedValue * 10);

      newNumbers = Array.from({ length: selectedValue - 4 }, (_, index) => start + index);
      setNumbers(newNumbers);
    }
  }
  
  const setTotalTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime: number = parseInt(event.target.value, 10);
    setTotalSec(newTime);
    console.log(`전체 미팅 시간은 ${totalSec}`)
  };
  
  return (
    <>
      <div className="flex flex-col items-start">
        <AdminInput labelFor="시작날짜" type="date" placeholder="" />

        <div className="flex items-end">
          <AdminInput labelFor="다음 통화까지 대기시간" type="number" placeholder="10" min="5" max="60" step="5" />
          <p className="font-suit font-medium text-14 text-white p-1 pl-2">초</p>
        </div>

        <div className="flex items-end">
          <AdminInput labelFor="총 미팅 시간" type="text" placeholder="80" onChange={setTotalTime}/>
          <p className="font-suit font-medium text-14 text-white p-1 pl-2">초</p>
        </div>

        <div className="mx-1 my-2 font-suit font-medium text-14 text-white">{"사진 촬영"}

          <div className='flex'>
            <div className="flex items-center h-8 font-suit font-medium text-14 text-white">촬영 컷 수</div>
            <p className='input-warning leading-8 ml-1'>한 컷당 촬영 시간은 10초 입니다</p>
          </div>

          <div className="" onClick={openSelectDropdown}>
            <DropDown items={numbers} />
            {/* <select name="촬영 컷 수" size={5} className='w-48' ref={selectRef} onChange={handleSelectChange}>
              {numbers.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select> */}
            <p className="font-suit font-medium text-14 text-white p-1 pl-2">컷</p>
          </div>

          <div>한 멤버당 미팅 시간은 사인회 시간 {totalSec - picSec} 초와 촬영 시간 {picSec} 초를 더한 {totalSec} 초 입니다</div>

        </div>
        <AdminInput labelFor="미팅시간" type="option" placeholder="Enter your name" />

        <AdminInput labelFor="그룹" type="text" placeholder="Enter your name" />
        <AdminInput labelFor="멤버" type="text" placeholder="Enter your name" />
        {/* <AdminBtn text="추가" onClick={handleClick} /> */}
      </div>
      미팅 시간을 절반으로 나눈 값을 10으로 나누어서 floor 한 정수를 넘지 않는 범위까지만 유지 컷 수
    </>
  );
};

export default MeetingLeftSection;