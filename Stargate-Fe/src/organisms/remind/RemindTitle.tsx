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
    <div className="mt-2 mr-2">
      <div className="mb-3 font-medium text-white font-suit text-60">
        {formattedDate}
      </div>
      <div className="font-medium text-white font-suit text-80">{name}</div>
    </div>
  );
};

export default RemindTitle;
