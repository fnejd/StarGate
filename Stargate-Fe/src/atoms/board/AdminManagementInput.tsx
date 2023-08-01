/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from 'react';

/**
 * InputComponent
 * @param isGroup => 인풋 태그 타입 설정 변수
 * @param getter => 기존 유저 값
 * @param setter() => 인풋 태그의 값 세팅할 setter
 * @param value => 마이페이지에서 기본적으로 들어가 있을 값
 */

interface InputProps {
  isGroup: boolean;
  getter?: object;
  setter: React.Dispatch<React.SetStateAction<object>>;
  value?: string;
}

const InputComponent = ({ isGroup, getter, setter, value }: InputProps) => {
  // Input onChange 시 setter 호출해 state 값 변경해주기
  // 더 좋은 방법 없을까? 고민해보기
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setter({
      ...getter,
      [name]: value,
    });
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(value); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    <div className="p-1 m-2 w-xs h-full flex justify-center">
      <input
        onChange={(e) => onChange(e)}
        className="text-center w-xs"
        value={value}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default InputComponent;
