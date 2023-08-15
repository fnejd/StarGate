import React from 'react';

/**
 * PlusButtonProps
 * @param onClick => 버튼이 클릭될때 호출되는 콜백 함수, 부모 컴포넌트에서 원하는 동작을 onClick으로 정의해서 전달가능
 */

interface PlusButtonProps {
  isPlus?: boolean;
  onClick?: () => void;
}

const PlusButton = ({ isPlus = true, onClick }: PlusButtonProps) => {
  return (
    <div>
      <div
        className="w-24 h-24 rounded-full bg-white flex items-center justify-center cursor-pointer"
        onClick={onClick}
      >
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
          <p className="text-mainblue text-32 flex items-center">{isPlus ? ('+') : ('-')}</p>
        </div>
      </div>
    </div>
  );
};

export default PlusButton;
