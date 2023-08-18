import { useState } from 'react';
import PlusMinusButton from '../../atoms/board/PlusMinusButton';
import AdminManagementModalBox from './AdminManagementModalBox';
import BtnBlue from '@/atoms/common/BtnBlue';
import RedButton from '@/atoms/common/RedButton';
import { deleteGroup } from '@/services/adminBoardService';
import { useRecoilState } from 'recoil';
import {
  groupsShouldFetch,
  selectedGroupNoState,
  groupsDeleteState,
} from '@/recoil/adminManagementState';
import { GroupData } from '@/types/board/type';

/**
 * AdminManagementModal
 * group의 이름들을 가져와서 버튼으로 출력, 만약 5의 배수가 아니라면 비어있는 <div>를 이용해 공간을 채워줌
 * 버튼을 click하면, setSelectedGroup에 group을 state로 넣어줌
 */

interface AdminManagementModalProps {
  group: GroupData[];
}

const AdminManagementModal = ({ group }: AdminManagementModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] =
    useRecoilState(selectedGroupNoState);
  const [groupsDelete, setGroupsDelete] = useRecoilState(groupsDeleteState);
  const [groupsFetch, setGroupsFetch] = useRecoilState(groupsShouldFetch);
  const groupNames = group.map((data) => data.name);
  const groupNums = group.map((data) => data.groupNo);
  const totalButtons = Math.ceil(groupNums.length / 5) * 5;

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setGroupsDelete(false);
  };

  const handleModalClose = () => {
    setSelectedGroup(null);
    setIsModalOpen(false);
  };

  /**
   * 버튼이 클릭되면, props로 전달받은 groupName을 이용해 group의 data를 찾음
   * data에서 groupNo를 selectedGroup에 저장, 만약에 못찾았다면 null값을 넣어줌
   * 그 후 setIsModalOpen을 이용해 Modal창을 열어줌
   */

  const handleCircleClick = (groupNo: number) => {
    setSelectedGroup(groupNo);
    handleModalOpen();
  };

  const handlePlusClick = () => {
    handleModalOpen();
  };

  const handleMinusClick = () => {
    if (groupsDelete) {
      setGroupsDelete(false);
    } else {
      setGroupsDelete(true);
    }
  };

  const groupDeleteHandle = async (groupDeleteNum: number) => {
    if (groupDeleteNum !== null) {
      const confirmed = window.confirm('정말로 이 그룹을 삭제하시겠습니까?');
      if (confirmed) {
        try {
          await deleteGroup(groupDeleteNum);
          setGroupsFetch(true);
        } catch (error) {
        }
      }
    } else {
    }
  };
  return (
    <div>
      <div className="w-l h-500 flex flex-col justify-between">
        <div className="flex justify-between flex-wrap">
          {Array.from({ length: totalButtons }).map((_, index) => {
            const groupName = groupNames[index];
            const groupNo = groupNums[index];
            if (groupNo) {
              return (
                <div
                  key={groupNo}
                  className="lg:w-1/5 flex justify-center h2r mb-14 relative"
                >
                  <BtnBlue
                    onClick={() => handleCircleClick(groupNo)}
                    text={groupName}
                  ></BtnBlue>
                  {groupsDelete && (
                    <div className="absolute top-0 right-0 z-10">
                      <RedButton
                        onClick={() => groupDeleteHandle(groupNo)}
                        isCall={false}
                      ></RedButton>
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div key={index} className="lg:w-1/5 flex justify-center"></div>
              );
            }
          })}
        </div>
        <div className="self-end w-1/5 flex justify-between">
          <PlusMinusButton onClick={handlePlusClick} />
          <PlusMinusButton isPlus={false} onClick={handleMinusClick} />
        </div>
        <AdminManagementModalBox
          isOpen={isModalOpen}
          onClose={handleModalClose}
          groupNo={selectedGroup}
          groupName={
            selectedGroup !== null
              ? group.find((data) => data.groupNo === selectedGroup)?.name || ''
              : ''
          }
          members={
            selectedGroup
              ? group.find((data) => data.groupNo === selectedGroup)?.members ||
                []
              : []
          }
        />
      </div>
    </div>
  );
};

export default AdminManagementModal;
