import TimeLeftComponent from '@/atoms/common/TimeLeftComponent';
import ProFileIcon from '@/atoms/video/ProFileIcon';
import React, { useState } from 'react';

interface VideoHeaaderProps {
  min: number;
  sec: number;
  type: string;
  fUserData:
    | {
        email: string;
        name: string;
        nickname: string;
        birthday: string;
        isPolaroidEnable: boolean;
        postitContents: string;
        totalMeetingCnt: number;
      }[]
    | null;
  fUserIdx: number;
}

// Props 에 유저 데이터 넣는 부분 추가해주기
// type.ts에 유저 데이터 타입 추가해주고 전역으로 사용하기
const VideoHeaderComponent: React.FC<VideoHeaaderProps> = ({
  min,
  sec,
  type,
  fUserData,
  fUserIdx,
}) => {
  const [nextUser, setNextUser] = useState('김수환');

  console.log(fUserData);

  return type == 'star' && fUserData != undefined ? (
    <div className="flex flex-row w-screen my-5">
      <div className="flex items-center basis-1/2 w-full text-white ml-5">
        <ProFileIcon />
        <div className="mx-auto">
          <p>이름: {fUserData[fUserIdx].name}</p>
          <p>생일: {fUserData[fUserIdx].birthday}</p>
          <p>촬영 여부: {fUserData[fUserIdx].isPolaroidEnable}</p>
        </div>
      </div>
      <div className="flex basis-1/4 justify-end mr-5">
        <TimeLeftComponent min={min} sec={sec} />
      </div>
      {/* 다음 사람 뜨는 텍스트 부분 */}
      <div className="flex basis-1/4 justify-center text-white">
        <p className="text-xl mt-1">NEXT</p>
        <p className="modal-title">{nextUser}</p>
      </div>
    </div>
  ) : (
    <div className="flex flex-row w-screen my-5">
      <div className="basis-1/2 w-full text-white ml-5">
        <ProFileIcon />
      </div>
      <div className="flex basis-1/4 justify-end mr-5">
        <TimeLeftComponent min={min} sec={sec} />
      </div>
      {/* 다음 사람 뜨는 텍스트 부분 */}
      <div className="flex basis-1/4 justify-center text-white">
        <p className="text-xl mt-1">NEXT</p>
        <p className="modal-title">{nextUser}</p>
      </div>
    </div>
  );
};

export default VideoHeaderComponent;
