import { useState } from 'react';
import PlusMinusButton from '../../atoms/board/PlusMinusButton';
import AdminManagementModalBox from './AdminManagementModalBox';
import BtnBlue from '@/atoms/common/BtnBlue';
import { deleteGroup } from '@/services/adminBoardService';
import { useRecoilState } from 'recoil';
import { selectedGroupNoState } from '@/recoil/adminManagementState';
/**
 * AdminManagementModal
 * group의 이름들을 가져와서 버튼으로 출력, 만약 5의 배수가 아니라면 비어있는 <div>를 이용해 공간을 채워줌
 * 버튼을 click하면, setSelectedGroup에 group을 state로 넣어줌
 */

interface MemberData {
  memberNo: number;
  name: string;
}
interface GroupData {
  groupNo: number;
  name: string;
  members: MemberData[];
}
interface AdminManagementModalProps {
  group: GroupData[];
}

const AdminManagementModal = ({ group }: AdminManagementModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteGroupNo, setDeleteGroupNo] = useState<number | null>(null);
  const [selectedGroup, setSelectedGroup] =
    useRecoilState(selectedGroupNoState);
  const groupNames = group.map((data) => data.name);
  const totalButtons = Math.ceil(groupNames.length / 5) * 5;

  const groupDeleteHandle = async () => {
    if (deleteGroupNo !== null) {
      try {
        await deleteGroup(deleteGroupNo);
        setDeleteGroupNo(null);
        console.log('그룹 삭제:', deleteGroupNo);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('deleteGroupNo 없음');
    }
  };

  /**
   * handleCircleClick
   * 버튼이 클릭되면, props로 전달받은 groupName을 이용해 group의 data를 찾음
   * data에서 groupNo를 selectedGroup에 저장, 만약에 못찾았다면 null값을 넣어줌
   * 그 후 setIsModalOpen을 이용해 Modal창을 열어줌
   */

  const handleCircleClick = (groupName: string) => {
    const selectedGroupNo =
      group.find((data) => data.name === groupName)?.groupNo || null;
    setSelectedGroup(selectedGroupNo);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedGroup(null);
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="w-l h-500 flex flex-col justify-between">
        <div className="flex justify-between flex-wrap">
          {Array.from({ length: totalButtons }).map((_, index) => {
            const groupName = groupNames[index];
            if (groupName) {
              return (
                <div
                  key={groupName}
                  className="lg:w-1/5 flex justify-center h2r mb-14"
                >
                  <BtnBlue
                    onClick={() => handleCircleClick(groupName)}
                    text={groupName}
                  ></BtnBlue>
                </div>
              );
            } else {
              return (
                <div key={index} className="lg:w-1/5 flex justify-center"></div>
              );
            }
          })}
        </div>
        <div className="self-end flex">
          <PlusMinusButton onClick={() => handleCircleClick('')} />
          <PlusMinusButton isPlus = {false} onClick={() => handleCircleClick('')} />
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
