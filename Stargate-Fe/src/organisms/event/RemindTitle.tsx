import React from 'react';

interface RemindTitleProps {
  name: string; // 팬사인회 제목
  startDate: string;
  groupName: string;
}

const RemindTitle = ({ name, startDatem, groupName }: RemindTitleProps) => {
  const dateObj = new Date('2023-07-19T03:46:22.904');
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
  };
  const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(
    dateObj
  );

  return (
    <div>
      <div className="font-suit text-48 font-medium text-white mb-3">
        {formattedDate}
      </div>
      <div className="font-suit text-80 font-medium text-white">
        이유한 스무살 기념 팬사인회
      </div>
    </div>
  );
};

export default RemindTitle;
