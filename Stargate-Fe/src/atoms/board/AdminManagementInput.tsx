import React, { useState, useEffect } from 'react';
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
  selectedGroupNameState
} from '@/recoil/adminManagementState';
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

interface MemberData {
  memberNo: number;
  name: string;
}

interface newGroup {
  groupNo: number;
  name: string;
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
  const [selectedGroupNo, setSelectedGroupNo] = useRecoilState(selectedGroupNoState);
  const [selectedGroupName, setSelectedGroupName] = useRecoilState(selectedGroupNameState);
  const [groupsFetch, setGroupsFetch] = useRecoilState(groupsShouldFetch);

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
        setGroupsFetch(true);
      } catch (error) {
        console.log('그룹 업데이트 에러:', error);
      }
    } else {
      try {
        const newGroup = await createGroup(inputValue);
        console.log(newGroup)
        if (newGroup !== undefined){
          setGroups([...groups, newGroup])
          // setSelectedGroupNo(newGroup.groupNo);
          // setSelectedGroupName(newGroup.name);
          setGroupsFetch(true);
        }
      } catch (error) {
        console.log('그룹 생성 에러:', error);
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
        console.log('멤버 업데이트', inputValue);
        setGroupsFetch(true);
      } catch (error) {
        console.log('멤버 업데이트 에러:', error);
      }
    } else {
      if (groupNo)
        try {
          const newMember = await createMember(groupNo, inputValue);
          console.log(inputValue,'===', newMember)
          if (newMember !== undefined) {
            console.log('멤버 생성 시작');
            setSelectedGroupMembers([...selectedGroupMembers, newMember]);
            setGroupsFetch(true);
          }
          console.log('멤버 생성', inputValue);
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
      if (isGroup) {
        groupInputHandle();
        console.log('그룹')
      } else {
        memberInputHandle();
        console.log('멤버')
      }
      console.log('엔터');
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
