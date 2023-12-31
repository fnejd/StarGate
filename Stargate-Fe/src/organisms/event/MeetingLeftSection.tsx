import React, { useState, useEffect } from 'react';
import AdminInput from '@/atoms/event/AdminInput';
import DropDown from '@/atoms/event/DropDown';
import AdminToggle from '@/atoms/common/AdminToggle';
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

interface FormData {
  name: string;
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

interface MeetingLeftSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const MeetingLeftSection = ({
  formData,
  setFormData,
}: MeetingLeftSectionProps) => {
  const [picSec, setPicSec] = useState<number>(40);
  const [photoTime, setPhotoTime] = useState<boolean>(false);
  const [initial, setInitial] = useState(false);
  // const [totalSec, setTotalSec] = useState<number>(80);

  const [selectDate, setSelectDate] = useState<string | null>(null);
  const [selectTime, setSelectTime] = useState<string | null>(null);
  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    if (formData.startDate && !initial) {
      // initializing
      const arr =
        formData.startDate instanceof Date
          ? formData.startDate.toISOString().split('T')
          : formData.startDate.split('T');
      setSelectDate(arr[0]);
      setSelectTime(arr[1]);
      setInitial(true);
    }
    if (formData.photoNum > 0) {
      setPhotoTime(true);
      setPicSec(formData.photoNum * 10);
      const cnt = Math.floor(formData.meetingTime / 2 / 10);
      let newNumbers: number[] = [formData.photoNum];

      newNumbers = Array.from({ length: cnt - 4 }, (_, index) => 4 + index);
      setNumbers(newNumbers);
    }
  }, [formData]);

  useEffect(() => {
    // photoTime이 false일 때 picSec를 0으로 업데이트
    if (!photoTime) {
      setPicSec(0);
    }
  }, [photoTime]);

  useEffect(() => {
    if (selectDate && selectTime) {
      // 상위로 전달
      setFormData((prevFormData) => ({
        ...prevFormData,
        startDate: `${selectDate}T${selectTime}:00`,
      }));
    }
  }, [selectDate, selectTime]);

  const handleStartDate = (value: string): void => {
    const [year, month, day] = value.split('-');
    const newDate: Date = new Date(
      Date.UTC(Number(year), Number(month) - 1, Number(day))
    );
    if (newDate.getTime() < Date.now()) {
      Swal.fire('날짜 설정 실패', '과거 날짜는 선택할 수 없습니다.', 'error');
      return;
    }
    setSelectDate(value);
  };

  const handleTimeChange = (value: string): void => {
    setSelectTime(value);
  };

  const handleTotalTime = (value: number): void => {
    // if (value <= 80) {
    //   alert('전체 미팅 시간은 80초보다 커야 합니다.');
    // }

    // 상위로 전달
    setFormData((prevFormData) => ({
      ...prevFormData,
      meetingTime: value,
    }));

    const cnt = Math.floor(value / 2 / 10);

    let newNumbers: number[] = [4];

    newNumbers = Array.from({ length: cnt - 4 }, (_, index) => 4 + index);
    setNumbers(newNumbers);
  };

  const handleTimeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (typeof value == 'number' && value <= 80) {
      Swal.fire(
        '시간 설정 실패',
        '전체 미팅 시간은 80초보다 커야 합니다.',
        'error'
      );
    }
  };

  const handlePicSecChange = (value: number) => {
    setPicSec(value * 10);
    setFormData((prevFormData) => ({
      ...prevFormData,
      photoNum: value,
    }));
  };

  return (
    <div className="mb-6 w-550">
      <div className="flex items-end">
        <div className="w-52">
          <AdminInput
            labelFor="시작 날짜"
            type="date"
            placeholder=""
            max="9999-12-31"
            value={
              formData.startDate instanceof Date
                ? formData.startDate.toISOString().split('T')[0]
                : selectDate
            } // startDate가 null이 아니면 value로 설정, null이면 빈 문자열로 설정
            onInputChange={handleStartDate}
          />
        </div>
        <p className="p1b text-white h-full">{selectDate}</p>
      </div>

      <div className="flex items-end w-48">
        <AdminInput
          labelFor="시작 시간"
          type="time"
          placeholder=""
          // 여기 밸류값 변경해야해요!!!!!!!!!!!!!!!!!!!!!!!
          value={selectTime} // startDate가 null이 아니면 value로 설정, null이면 빈 문자열로 설정
          onInputChange={handleTimeChange}
        />
        <p className="p1b text-white h-full">{selectTime}</p>
      </div>

      <div className="flex items-end w-48">
        <AdminInput
          labelFor="총 미팅 시간"
          type="number"
          placeholder="80"
          value={formData.meetingTime}
          onInputChange={(value) => handleTotalTime(Number(value))}
          onBlur={handleTimeBlur}
        >
          <p className="p-1 pl-2 font-medium text-white font-suit text-14">
            초
          </p>
        </AdminInput>
      </div>

      <div className="flex items-end w-48 h-8 mt-5">
        <div className="w-32 h-8 mx-1 mt-4 font-semibold leading-8 text-left text-white font-suit text-14">
          {'사진 촬영'}
        </div>
        <AdminToggle photoTime={photoTime} setPhotoTime={setPhotoTime} />
      </div>

      <div className="flex h-8">
        <div className="flex mx-1 my-2 font-medium text-white font-suit text-14">
          촬영 컷 수
        </div>
        <p className="ml-1 leading-9 input-warning">
          한 컷당 촬영 시간은 10초 입니다
        </p>
      </div>

      <div className="flex items-end">
        <DropDown
          options={numbers}
          onOptionChange={handlePicSecChange}
          disabled={!photoTime}
        />
        <p className="p-1 pl-2 mb-1 font-medium text-white font-suit text-14">
          컷
        </p>
      </div>
      <div className="mx-1 my-2 font-medium text-white font-suit text-14">
        연예인 1 명의 미팅 시간은 사인회 시간 {formData.meetingTime - picSec}{' '}
        초와 촬영 시간 {picSec} 초를 더한 {formData.meetingTime} 초 입니다
      </div>
    </div>
  );
};

export default MeetingLeftSection;
