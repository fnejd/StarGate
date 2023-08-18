import React from 'react';

/**
 * RedButtonProps
 * @param onClick => 버튼이 클릭될때 호출되는 콜백 함수, 부모 컴포넌트에서 원하는 동작을 onClick으로 정의해서 전달가능
 */

interface RedButtonProps {
  isCall?: boolean;
  onClick?: () => void;
}

const RedButton = ( {isCall = true, onClick }: RedButtonProps) => {
  return (
    <div className="rounded-full bg-red w-fit h-fit" onClick={onClick}>
      <span className="material-symbols-rounded text-white text-3xl m-2">{isCall ? (`call`) : (`delete`)}</span>
    </div>
  );
};

export default RedButton;
