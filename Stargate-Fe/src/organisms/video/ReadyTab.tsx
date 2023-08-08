import React from 'react';

// interface RemindTitleProps {
//   name: string; // 팬사인회 제목
//   startDate: string;
//   groupName: string;
// }

const ReadyTab = () => {
  const tabList = [
    '공지사항',
    '카메라 및 마이크 테스트',
    '폴라로이드',
    '전달할 포스트잇',
    '내가 볼 메모장',
    '입장 대기존',
  ];

  return (
    <div className="mx-auto">
      <div className="font-medium text-white font-suit text-40">
        이유한 스무살 기념 팬사인회
      </div>
      <div className="bg-white rounded-md w-l h-550">
        {tabList.map((tab, index) => (
          <div key={index} className="w-1/4 h-200 text-black p-4">
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadyTab;
