import { useState, useEffect, useRef, MouseEvent } from 'react';
import AdminMangementPlusButton from '@/atoms/board/AdminMangementPlusButton';
import AdminManagementDeleteButton from '@/atoms/board/AdminManagementDeleteButton';
import AdminManagementInput from '@/atoms/board/AdminManagementInput';
import { deleteMember } from '@/services/adminBoardService';
import { useRecoilState } from 'recoil';
import {
  selectedGroupMembersState,
  groupsShouldFetch,
} from '@/recoil/adminManagementState';
import { MemberData } from '@/types/board/type';

/**
 * ManagementModalBoxProps
 * @param isOpen => 모달 창이 열려있는지를 나타내는 boolean 값
 * @param onClose => 모달 창이 닫힐 때 호출되는 콜백 함수
 * @param members => 선택된 그룹에 해당하는 멤버들의 정보가 담긴 객체
 */
interface ManagementModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
  groupNo: number | null;
  groupName: string;
  members: MemberData[];
}

const AdminManagementModalBox = ({
  isOpen,
  onClose,
  groupNo,
  groupName,
  members,
}: ManagementModalBoxProps) => {
  /**
   * useRef훅을 사용해서 생성된 변수, Dom요소에 대한 참조를 보관할 수 있는 객체
   */
  const modalRef = useRef<HTMLDivElement>(null);
  const [showInput, setShowInput] = useState(false);
  const [selectedGroupNo, setSelectedGroupNo] = useState<number | null>(null);
  const [selectedGroupName, setSelectedGroupName] = useState('');
  const [selectedMemberNo, setSelectedMemberNo] = useState<number | null>(null);
  const [selectedMemberName, setSelectedMemberName] = useState('');
  const [selectedGroupMembers, setSelectedGroupMembers] = useRecoilState(
    selectedGroupMembersState
  );
  const [groupsFetch, setGroupsFetch] = useRecoilState(groupsShouldFetch);
  /**
   * MouseEvent 객체를 가져와서 실행
   * 모달 창 바깥을 클릭했을때, 모달창이 존재하고 클릭 이벤트가 모달 창 밖에서 실행됐다면
   * onClose함수 호출
   */
  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      showInputClose();
      onClose();
    }
  };
  useEffect(() => {
    setSelectedGroupMembers(members);
  }, [members]);
  const showInputOpen = () => {
    setShowInput(true);
  };
  const showInputClose = () => {
    setShowInput(false);
    selectedClear();
  };
  const selectedClear = () => {
    setSelectedGroupNo(null);
    setSelectedGroupName('');
    setSelectedMemberNo(null);
    setSelectedMemberName('');
  };

  const handlePlusButtonClick = () => {
    selectedClear();
    showInputOpen();
  };
  /**
   * handleXButtonClick
   * Input이 열려있다면 handleXButtonClicktoCancle를 이용해 창을 닫음
   * 아니라면 멤버 삭제 함수 실행
   */
  const handleXButtonClick = (memberNo: number | void) => {
    if (showInput) {
      showInputClose();
    } else {
      handleXButtonClicktoDelete(memberNo);
    }
  };
  const handleXButtonClicktoDelete = async (memberNo: number | void) => {
    showInputClose();
    if (memberNo) {
      const confirmed = window.confirm('정말로 이 멤버를 삭제하시겠습니까?');
      if (confirmed) {
        try {
          await deleteMember(memberNo);
          const updatedMembers = selectedGroupMembers.filter(
            (member) => member.memberNo !== memberNo
          );
          setSelectedGroupMembers(updatedMembers);
          setGroupsFetch(true);
        } catch (error) {
        }
      }
    } else {
    }
  };
  const handleGroupDoubleClick = (
    groupNo: number | null,
    groupName: string
  ) => {
    showInputClose();
    showInputOpen();
    setSelectedGroupNo(groupNo);
    setSelectedGroupName(groupName);
  };
  const handleMemberDoubleClick = (memberNo: number, memberName: string) => {
    showInputClose();
    showInputOpen();
    setSelectedMemberNo(memberNo);
    setSelectedMemberName(memberName);
  };
  const handleInputEnter = () => {
    showInputClose();
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div
            ref={modalRef}
            className="w-l h-500 bg-white rounded-sm flex flex-col items-center"
          >
            {groupName ? (
              selectedGroupNo === null ? (
                <div className="flex">
                  <p
                    className="modal-title flex items-center my-2"
                    onDoubleClick={() =>
                      handleGroupDoubleClick(groupNo, groupName)
                    }
                  >
                    {groupName}
                  </p>
                  <AdminMangementPlusButton onClick={handlePlusButtonClick} />
                </div>
              ) : (
                <div className="flex">
                  <div className="modal-title flex items-center">
                    <AdminManagementInput
                      isGroup={true}
                      groupNo={groupNo}
                      value={selectedGroupName}
                      onEnter={handleInputEnter}
                    />
                    <AdminMangementPlusButton onClick={handlePlusButtonClick} />
                  </div>
                </div>
              )
            ) : (
              <div className="flex">
                <div className="modal-title flex items-center">
                  <AdminManagementInput
                    isGroup={true}
                    onEnter={handleInputEnter}
                  />
                  <AdminMangementPlusButton onClick={handlePlusButtonClick} />
                </div>
              </div>
            )}
            <div className="w-full h-400 overflow-auto">
            <ul className="w-full flex flex-col-reverse justify-end">
              {selectedGroupMembers.map((member) => (
                <li
                  className="modal-content justify-center flex"
                  key={member.memberNo}
                  onDoubleClick={() =>
                    handleMemberDoubleClick(member.memberNo, member.name)
                  }
                >
                  {selectedMemberNo === member.memberNo ? (
                    <AdminManagementInput
                      isGroup={false}
                      groupNo={groupNo}
                      memberNo={selectedMemberNo}
                      value={selectedMemberName}
                      onEnter={handleInputEnter}
                    />
                  ) : (
                    <p>{member.name}</p>
                  )}
                  <AdminManagementDeleteButton
                    onClick={() => handleXButtonClick(member.memberNo)}
                  />
                </li>
              ))}
              {showInput &&
                selectedMemberNo === null &&
                selectedGroupNo === null && (
                  <li className="modal-content justify-center flex">
                    <AdminManagementInput
                      isGroup={false}
                      groupNo={groupNo}
                      value={selectedMemberName}
                      onEnter={handleInputEnter}
                    />
                    <AdminManagementDeleteButton
                      onClick={() => handleXButtonClick()}
                    />
                  </li>
                )}
            </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminManagementModalBox;
