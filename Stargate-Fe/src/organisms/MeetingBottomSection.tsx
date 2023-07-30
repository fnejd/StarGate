import { useState } from 'react';
import CSVReader from 'react-csv-reader';
import AdminBtn from '@/atoms/AdminBtn.tsx';
import AdminInput from '@/atoms/AdminInput.tsx';

interface FormData {
  starName: string;
  meetingMembers: (string | undefined)[];
  fans: (string | undefined)[];
  watingTime: string;
}

const MeetingBottomSection = () => {
  const [starValue, setStarValue] = useState('');
  const [memberValue, setMemberValue] = useState('');
  const [watingtimeValue, setWatingtimeValue] = useState('');
  const [fanValue, setFanValue] = useState('');
  const [formData, setFormData] = useState<FormData>({
    starName: '',
    meetingMembers: [],
    fans: [],
    watingTime: '',
  });

  const handleStarvalue = (value: string) => {
    setStarValue(value);
    console.log(`연예인은 ${starValue}`);
  };

  const handleMembervalue = (value: string) => {
    setMemberValue(value);
    console.log(`멤버는 ${memberValue}`);
    console.log(formData.meetingMembers);
  };

  const handleWatingtime = (value: string) => {
    setWatingtimeValue(value);
    console.log(`대기시간은 ${watingtimeValue}`);
  };

  const handleFanValue = (value: string) => {
    setFanValue(value);
    console.log(`입력값 ${fanValue}`);
  };

  // const handleForm = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   fieldName: keyof FormData
  // ) => {
  //   setFormData({ ...formData, [fieldName]: e.target.value });
  // };

  // 등록 함수
  const addStar = (name: string) => {
    setFormData({ ...formData, starName: name });
    setStarValue('');
  };

  const addMember = (name: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      members: [...prevFormData.meetingMembers, name],
    }));
    setMemberValue('');
  };

  const addWatingtime = (value: string) => {
    setFormData({ ...formData, watingTime: value });
    // setWatingtimeValue('');
  };

  const addFans = (name: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fans: [...prevFormData.fans, name],
    }));
    setFanValue('');
  };

  const handleCsvData = (data, fileInfo) => {
    console.log(data);
  };

  // 삭제 함수
  const deleteStar = () => {
    setFormData((prevFormData) => {
      return { ...prevFormData, starName: '' };
    });
  };

  const deleteMember = (index: number) => {
    setFormData((prevFormData) => {
      const updatedMembers = [...prevFormData.meetingMembers];
      updatedMembers.splice(index, 1);
      return { ...prevFormData, members: updatedMembers };
    });
  };

  const deleteFan = (index: number) => {
    setFormData((prevFormData) => {
      const updatedFans = [...prevFormData.fans];
      updatedFans.splice(index, 1);
      return { ...prevFormData, fans: updatedFans };
    });
  };

  return (
    <>
      {/* 연예인명 추가 */}
      <div className="flex flex-col items-start">
        <AdminInput
          labelFor="연예인명 / 그룹명"
          type="text"
          onInputChange={handleStarvalue}
          value={starValue}
        >
          <AdminBtn text="등록" onClick={() => addStar(starValue)} />
        </AdminInput>
        {formData.starName ? (
          <div className="w-62 mt-2 flex justify-between items-center">
            <div className="mx-1 my-2 text-left font-suit font-medium text-14 text-white">
              {formData.starName}
            </div>
            <AdminBtn text="삭제" onClick={() => deleteStar()} />
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* 멤버명 추가 */}
      <div className="flex flex-col items-start">
        <AdminInput
          labelFor="그룹 멤버명"
          type="text"
          onInputChange={handleMembervalue}
          value={memberValue}
        >
          <AdminBtn text="등록" onClick={() => addMember(memberValue)} />
        </AdminInput>
      </div>
      <div className="flex flex-col items-start w-52 justify-between">
        {formData.meetingMembers.map((item, index) => (
          <div
            key={index}
            className="w-62 mt-2 flex justify-between items-center"
          >
            <div className="mx-1 my-2 text-left font-suit font-medium text-14 text-white">
              {item}
            </div>
            <AdminBtn text="삭제" onClick={() => deleteMember(index)} />
          </div>
        ))}
      </div>
      {/* 멤버가 다수일 경우 다음 통화까지 대기시간 설정 가능 */}
      {formData.meetingMembers.length >= 1 && (
        <div className="flex items-end">
          <AdminInput
            labelFor="다음 통화까지 대기시간 (초)"
            type="number"
            placeholder="10"
            min="5"
            max="60"
            step="5"
            value={watingtimeValue}
            onInputChange={handleWatingtime}
          >
            {' '}
            <AdminBtn
              text="등록"
              onClick={() => addWatingtime(watingtimeValue)}
            />
          </AdminInput>
          {/* <p className="font-suit font-medium text-14 text-white p-1 pl-2">
            초
          </p> */}
        </div>
      )}
      {/* 참가자 추가 */}
      <div className="flex flex-col items-start">
        <div className="flex">
          <AdminInput
            labelFor="참가자 등록"
            type="text"
            onInputChange={handleFanValue}
            value={fanValue}
            placeholder="stargate@gmail.com"
          >
            <AdminBtn text="등록" onClick={() => addFans(fanValue)} />
          </AdminInput>
          <div className="relative top-9 inline-block w-32 h-8 cursor-pointer">
            <CSVReader
              cssClass="csv-btn"
              label="CSV 파일 불러오기"
              onFileLoaded={handleCsvData}
            />
            <div className="w-32 h-8 leading-8 text-12 font-medium bg-admingray font-suit text-black rounded-sm text-center">
              CSV 파일 불러오기
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start w-52 justify-between">
          {formData.fans.map((item, index) => (
            <div
              key={index}
              className="w-62 mt-2 flex justify-between items-center"
            >
              <div className="mx-1 my-2 text-left font-suit font-medium text-14 text-white">
                {item}
              </div>
              <AdminBtn text="삭제" onClick={() => deleteFan(index)} />
            </div>
          ))}
        </div>
      </div>

      {/* <div className="mx-1 my-2 text-left font-suit font-medium text-14 text-white">
        총 미팅 시간은 분 초 입니다
      </div> */}
    </>
  );
};

export default MeetingBottomSection;
