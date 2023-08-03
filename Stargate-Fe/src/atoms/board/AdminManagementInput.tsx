import React, { useState, useEffect } from 'react';

/**
 * AdminManagementInput
 * @param isGroup => 인풋 태그 타입 설정 변수
 * @param value => 마이페이지에서 기본적으로 들어가 있을 값
 */

interface AdminManagementInputProps {
  isGroup: boolean;
  groupNo?: number | null;
  memberNo?: number | null;
  value?: string;
}

const AdminManagementInput = ({
  isGroup,
  groupNo,
  memberNo,
  value,
}: AdminManagementInputProps) => {
  // Input onChange 시 value값 변경해주기
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };
  const [inputValue, setInputValue] = useState<string>(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const groupInputHandle = () => {
    console.log(inputValue);
    console.log(groupNo);
  }
  const memberInputHandle = () => {
    console.log(inputValue);
    console.log(memberNo);
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(isGroup);
      if (isGroup) { 
        groupInputHandle()
      } else {
        memberInputHandle()
      }
    }
  };

  return (
    <div className="p-1 m-2 w-xs h-full flex justify-center border-b-2 border-black">
      <input
        onChange={onChange}
        className="text-center w-xs outline-none"
        value={inputValue}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default AdminManagementInput;
