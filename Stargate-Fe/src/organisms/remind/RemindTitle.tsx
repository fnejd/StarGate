import React from 'react';

interface RemindTitleProps {
  name: string; // 팬사인회 제목
  startDate: string;
  groupName: string;
}

const RemindTitle = ({ name, startDate, groupName }: RemindTitleProps) => {
  const dateObj = new Date(startDate);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
  };
  const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(
    dateObj
  );

  return (
    <div className="mt-7 mr-7 w-1/2 h-1/2">
      <div className="font-suit text-48 font-medium text-white mb-3">
        {formattedDate}
      </div>
      <div className="font-suit text-60 font-medium text-white">{name}</div>
    </div>
  );
};

export default RemindTitle;
