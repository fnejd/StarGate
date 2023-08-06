import React, { useState, useEffect } from 'react';
import {
  createMember,
  updateMember,
  createGroup,
  updateGroup,
} from '@/services/adminBoardService';
/**
 * 수정이랑 생성을 어떻게 구분할거?
 * 입력 부분에 따라서?
 */
/**
 * AdminManagementInput
 * @param isGroup => 인풋 태그 타입 설정 변수
 * @param groupNo => group번호. isGroup가 True일 때, group번호가 없다면 생성
 * @param memberNo => member번호, isGroup가 False일 때, member번호가 없다면 생성
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
  const [inputValue, setInputValue] = useState<string>(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  // Input onChange 시 value값 변경해주기
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const groupInputHandle = async () => {
    if (groupNo) {
      try {
        await updateGroup(groupNo, inputValue);
      } catch (error) {
        console.log('그룹 업데이트 에러:', error);
      }
    } else {
      try {
        await createGroup(inputValue);
      } catch (error) {
        console.log('그룹 생성 에러:', error);
      }
    }
  };

  const memberInputHandle = async () => {
    if (memberNo) {
      try {
        await updateMember(memberNo, inputValue);
      } catch (error) {
        console.log('멤버 업데이트 에러:', error);
      }
    } else {
      if (groupNo)
        try {
          await createMember(groupNo, inputValue);
        } catch (error) {
          console.log('멤버 생성 에러:', error);
        }
      else {
        console.log('그룹번호없음');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(isGroup);
      if (isGroup) {
        groupInputHandle();
      } else {
        memberInputHandle();
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
