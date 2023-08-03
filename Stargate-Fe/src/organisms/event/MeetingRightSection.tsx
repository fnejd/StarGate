import React, { useState } from 'react';

const MeetingRightSection = () => {
  const [textValue, setTextValue] = useState<string>('');

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextValue(event.target.value);
  };

  return (
    <>
      <div className="w-48 h-8">
        <div className="flex w-48 mx-1 my-2 font-suit font-medium text-14 text-white">
          공지사항
        </div>
        <textarea
          id="myTextarea"
          value={textValue}
          onChange={handleTextareaChange}
          placeholder="대기화면에 띄워질 공지를 작성해주세요"
          className="w-400 h-350 text-12 ml-1 px-3 py-2 border border-gray-300 rounded-sm bg-white text-black placeholder-pl-5 font-suit focus:outline-none focus:ring-2 focus:ring-mainblue-300 focus:border-transparent"
        />
      </div>
    </>
  );
};

export default MeetingRightSection;
