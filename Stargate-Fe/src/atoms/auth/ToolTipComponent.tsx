import React, { useState } from 'react';

const ToolTipComponent = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative m-2 z-10">
      <div
        className={
          hover ? `opacity-100 duration-200` : `opacity-0 duration-200`
        }
      >
        <span className="max-w-xs inline-flex items-center rounded-md bg-mainblue bg-opacity-20 p-2 text-md font-medium text-white ring-1 ring-inset ring-slate-500/10">
          우리 서비스는 비대면 팬사인회를 위한 WebRTC 플랫폼입니다. 
          궁금한 점이 있으시다면 SSAFY에 연락주세요.
        </span>
      </div>
      <a
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        className="relative z-20 text-b7 text-24 font-semibold hover:text-32 hover:text-b7 duration-300"
      >
        ?
      </a>
    </div>
  );
};

export default ToolTipComponent;
