import React, { useState } from 'react';

// interface RemindTitleProps {
//   name: string; // 팬사인회 제목
//   startDate: string;
//   groupName: string;
// }

const ReadyTab = () => {
  const [activeTab, setActiveTab] = useState<Number>(0);
  const tabList = [
    '공지사항',
    '카메라 및 마이크 테스트',
    '폴라로이드',
    '전달할 포스트잇',
    '내가 볼 메모장',
    '입장 대기존',
  ];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="mx-auto">
      <div className="font-medium text-white font-suit text-40">
        이유한 스무살 기념 팬사인회
      </div>
      <div className="flex flex-col flex-wrap w-l h-550 bg-white rounded-md">
        <div className="flex flex-col">
          {tabList.map((tab, index) => (
            <div
              className="flex items-center w-2/4 h-200 cursor-pointer"
              key={index}
              onClick={() => handleTabClick(index)}
            >
              <span className="material-icons text-center text-mainblue">
                check_circle
              </span>
              <div className="text-black p-4">{tab}</div>
            </div>
          ))}
        </div>
        <div className="my-auto w-2/4 h-500 text-black p-4 border border-black"></div>
      </div>
    </div>
  );
};

export default ReadyTab;
