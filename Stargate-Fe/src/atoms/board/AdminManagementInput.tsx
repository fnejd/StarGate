import React, { useState } from 'react';
import {
  createMember,
  updateMember,
  createGroup,
  updateGroup,
} from '@/services/adminBoardService';
import { useRecoilState } from 'recoil';
import {
  groupsState,
  groupsShouldFetch,
  selectedGroupMembersState,
  selectedGroupNoState,
  selectedGroupNameState,
} from '@/recoil/adminManagementState';
import { MemberData } from '@/types/board/type';
/**
 * AdminManagementInput
 * @param isGroup => 인풋 태그 타입 설정 변수
 * @param groupNo => group번호. isGroup가 True일 때, group번호가 없다면 생성
 * @param memberNo => member번호, isGroup가 False일 때, member번호가 없다면 생성
 * @param value => 마이페이지에서 기본적으로 들어가 있을 값
 * @param onEnter => Enter 키 입력 시 호출되는 콜백 함수
 */

interface AdminManagementInputProps {
  isGroup: boolean;
  groupNo?: number | null;
  memberNo?: number | null;
  value?: string;
  onEnter: () => void;
}

const AdminManagementInput = ({
  isGroup,
  groupNo,
  memberNo,
  value,
  onEnter,
}: AdminManagementInputProps) => {
  const [inputValue, setInputValue] = useState<string>(value || '');
  const [selectedGroupMembers, setSelectedGroupMembers] = useRecoilState<
    MemberData[]
  >(selectedGroupMembersState);
  const [groups, setGroups] = useRecoilState(groupsState);
  const [selectedGroupNo, setSelectedGroupNo] =
    useRecoilState(selectedGroupNoState);
  const [selectedGroupName, setSelectedGroupName] = useRecoilState(
    selectedGroupNameState
  );
  const [groupsFetch, setGroupsFetch] = useRecoilState(groupsShouldFetch);

  // Input onChange 시 value값 변경해주기
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const groupInputHandle = async () => {
    if (groupNo) {
      try {
        await updateGroup(groupNo, inputValue);
        setGroupsFetch(true);
      } catch (error) {
      }
    } else {
      try {
        const newGroup = await createGroup(inputValue);
        if (newGroup !== undefined) {
          setGroups([...groups, newGroup]);
          setSelectedGroupNo(newGroup.groupNo);
          setSelectedGroupName(newGroup.name);
          setGroupsFetch(true);
        }
      } catch (error) {
      }
    }
  };

  const memberInputHandle = async () => {
    if (memberNo) {
      try {
        await updateMember(memberNo, inputValue);
        const updatedMembers = selectedGroupMembers.map((member) =>
          member.memberNo === memberNo
            ? { ...member, name: inputValue }
            : member
        );
        setSelectedGroupMembers(updatedMembers);
        setGroupsFetch(true);
      } catch (error) {
      }
    } else {
      if (groupNo)
        try {
          const newMember = await createMember(groupNo, inputValue);
          if (newMember !== undefined) {
            setSelectedGroupMembers([...selectedGroupMembers, newMember]);
            setGroupsFetch(true);
          }
        } catch (error) {
        }
      else {
      }
    }
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (isGroup) {
        await groupInputHandle();
      } else {
        await memberInputHandle();
      }
      onEnter();
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
