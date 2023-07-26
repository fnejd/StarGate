import React, { useState } from 'react';
import ModalPlusButton from '../atoms/ModalPlusButton';
import ManagementModalBox from '../atoms/ManagementModalBox';
import BtnBlue from '@/atoms/BtnBlue';

/**
 * InputComponent
 * @param key => AdminManagements 페이지에서 넘겨받은 props의 key값인 group이름
 */

interface GroupData {
  [groupName: string]: { [memberName: string]: string };
}

interface AdminManagementModalProps {
  group: GroupData;
}

const AdminManagementModal = ({ group }: AdminManagementModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const groupNames = Object.keys(group);
  const totalButtons = Math.ceil(groupNames.length / 5) * 5;

  /**
   * group의 이름들을 가져와서 버튼으로 출력, 만약 5의 배수가 아니라면 비어있는 <div>를 이용해 공간을 채워줌
   * 버튼을 click하면, setSelectedGroup에 group을 state로 넣어줌
   */

  const handleCircleClick = (groupName: string) => {
    setSelectedGroup(groupName);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedGroup(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className='w-l h-500 flex flex-col justify-between'>
        <div className='flex justify-between flex-wrap'>
          {Array.from({ length: totalButtons }).map((_, index) => {
            const groupName = groupNames[index];
            if (groupName) {
              return (
                <div key={groupName} className='lg:w-1/5 flex justify-center'>
                  <BtnBlue
                    onClick={() => handleCircleClick(groupName)}
                    text={groupName}
                  ></BtnBlue>
                </div>
              );
            } else {
              return (
                <div key={index} className='lg:w-1/5 flex justify-center'></div>
              );
            }
          })}
        </div>
        <div className='self-end'>
          <ModalPlusButton onClick={() => handleCircleClick('')} />
        </div>
        <ManagementModalBox
          isOpen={isModalOpen}
          onClose={handleModalClose}
          members={selectedGroup ? group[selectedGroup] : {}}
        />
      </div>
    </div>
  );
};

export default AdminManagementModal;
