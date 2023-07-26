import React, { useState, useRef } from 'react';
import CSVReader from 'react-csv-reader';
import AdminBtn from '@/atoms/AdminBtn.tsx';
import AdminInput from '@/atoms/AdminInput.tsx';

const MeetingBottomSection = () => {
  const [members, setMembers] = useState<string[]>(['a']);
  const [fans, setFans] = useState<string[]>([]);

  const addStar: void = (name: string) => {
    // setMembers([...members, name]);
    console.log(name)
  };

  const addMember = (name: string) => {
    setMembers([...members, name]);
  };

  const addFans = (name: string) => {
    setMembers([...members, name]);
  };

  const handleCsvData = (data, fileInfo) => {
    console.log(data);
  };

  const handle = () => {
    console.log('a');
  };

  return (
    <>
      <div className="flex items-end">
        <AdminInput labelFor="연예인명 / 그룹명" type="text" onChange={(e) => addStar(e.target.value)}>
          <AdminBtn text="추가" onClick={() => addStar}/>
        </AdminInput>
      </div>

      <div className="flex flex-col items-start">
        <AdminInput labelFor="그룹 멤버명" type="text" onChange={(e) => setMembers(e.target.value)}>
          <AdminBtn text="추가" onClick={() => addMember}/>
        </AdminInput>
      </div>
      <div className='flex flex-col items-start w-52 justify-between'>
        {members.map((item, index) => (
          <div key={index} className="w-62 mt-2 flex justify-between items-center">
            <div className='mx-1 my-2 text-left font-suit font-medium text-14 text-white'>{item}</div>
            <AdminBtn text="삭제" onClick={() => handle} />
          </div>
        ))}
      </div>

      <div className="flex items-end">
        <AdminInput labelFor="참가자 등록" type="text" onChange={(e) => setFans(e.target.value)}>
          <AdminBtn text="추가" onClick={() => addFans}/>
        </AdminInput>
        <CSVReader
          cssClass='csv-btn'
          label="CSV 파일 불러오기"
          onFileLoaded={handleCsvData}
        />
        <span className="z-10 w-32 h-8 leading-8 ml-1 text-12 font-medium bg-admingray font-suit text-black rounded-sm">CSV 파일 불러오기</span>
        <div className='flex flex-col items-start w-52 justify-between'>
        {fans.map((item, index) => (
          <div key={index} className="w-62 mt-2 flex justify-between items-center">
            <div className='mx-1 my-2 text-left font-suit font-medium text-14 text-white'>{item}</div>
            <AdminBtn text="삭제" onClick={() => handle} />
          </div>
        ))}
        </div>
      </div>


      <div className="mx-1 my-2 text-left font-suit font-medium text-14 text-white">
        총 미팅 시간은 분 초 입니다
      </div>
    </>
  );
};

export default MeetingBottomSection;
