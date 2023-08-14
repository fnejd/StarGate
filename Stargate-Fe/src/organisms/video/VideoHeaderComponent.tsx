import TimeLeftComponent from '@/atoms/common/TimeLeftComponent';
import ProFileIcon from '@/atoms/video/ProFileIcon';
import React, { useState } from 'react';

interface VideoHeaaderProps {
  min: number;
  sec: number;
  type: string;
}

// Props 에 유저 데이터 넣는 부분 추가해주기
// type.ts에 유저 데이터 타입 추가해주고 전역으로 사용하기
const VideoHeaderComponent: React.FC<VideoHeaaderProps> = ({
  min,
  sec,
  type,
}) => {
  const [nextUser, setNextUser] = useState('김수환');

  return type == 'star' ? (
    <div className="flex flex-row w-screen my-5">
      <div className="flex items-center w-full ml-5 text-white basis-1/2">
        <ProFileIcon />
        <div className="mx-auto">
          <p>이름: user.name</p>
          <p>생일: user.birthday</p>
          <p>촬영 여부: user.isPolaroidEnable</p>
        </div>
      </div>
      <div className="flex justify-end mr-5 basis-1/4">
        <TimeLeftComponent min={min} sec={sec} />
      </div>
      {/* 다음 사람 뜨는 텍스트 부분 */}
      <div className="flex justify-center text-white basis-1/4">
        <p className="mt-1 text-xl">NEXT</p>
        <p className="modal-title">{nextUser}</p>
      </div>
    </div>
  ) : (
    <div className="flex flex-row w-screen my-5">
      <div className="w-full ml-5 text-white basis-1/2">
        <ProFileIcon />
      </div>
      <div className="flex justify-end mr-5 basis-1/4">
        <TimeLeftComponent min={min} sec={sec} />
      </div>
      {/* 다음 사람 뜨는 텍스트 부분 */}
      <div className="flex justify-center text-white basis-1/4">
        <p className="mt-1 text-xl">NEXT</p>
        <p className="modal-title">{nextUser}</p>
      </div>
    </div>
  );
};

export default VideoHeaderComponent;