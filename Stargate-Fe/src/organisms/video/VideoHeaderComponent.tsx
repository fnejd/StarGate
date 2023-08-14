import TimeLeftComponent from '@/atoms/common/TimeLeftComponent';
import ProFileIcon from '@/atoms/video/ProFileIcon';
import React, { useState } from 'react';

const VideoHeaderComponent = () => {
  const [time, setTime] = useState({ min: 0, sec: 0 });
  const [nextUser, setNextUser] = useState('김수환');

  return (
    <div className="flex flex-row w-screen my-5">
      <div className="basis-1/2 w-full text-white ml-5">
        <ProFileIcon />
      </div>
      <div className="flex basis-1/4 justify-end mr-5">
        <TimeLeftComponent min={time.min} sec={time.sec} />
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
