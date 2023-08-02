import React, { useState, useEffect } from 'react';

/**
 * AdminManagementInput
 * @param isGroup => 인풋 태그 타입 설정 변수
 * @param getter => 기존 유저 값
 * @param setter() => 인풋 태그의 값 세팅할 setter(문자열)
 * @param value => 마이페이지에서 기본적으로 들어가 있을 값
 */

/**
 * todo
 * 추후 함수형 프로그래밍으로 동작 변경하기
 */

interface AdminManagementInputProps {
  isGroup: boolean;
  groupNo?: number | null;
  getter?: object;
  setter: React.Dispatch<React.SetStateAction<string>>;
  value?: string;
}

const AdminManagementInput = ({
  isGroup,
  groupNo,
  getter,
  setter,
  value,
}: AdminManagementInputProps) => {
  // Input onChange 시 setter 호출해 state 값 변경해주기
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };
  const [inputValue, setInputValue] = useState<string>(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(isGroup);
      if (isGroup) { 
        console.log(inputValue);
      } else {
        console.log(inputValue);
        console.log(groupNo);
      }
    }
  };

  return (
    <div className="p-1 m-2 w-xs h-full flex justify-center border-b-2 border-black">
      <input
        onChange={onChange}
        className="text-center w-xs"
        value={inputValue}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default AdminManagementInput;
