import React, { useState } from 'react';
import ModalPlusButton from '../atoms/ModalPlusButton';
import ModalBox from '../atoms/ModalBox';

const AdminManagementModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCircleClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className='border-2 w-50vw h-600 flex flex-col justify-between'>
        <div>
          <button>그룹1</button>
          <button>그룹2</button>
          <button>그룹3</button>
        </div>
        <div className='self-end'>
          <ModalPlusButton onClick={handleCircleClick} />
        </div>
        <ModalBox isOpen={isModalOpen} onClose={handleModalClose} />
      </div>
    </div>
  );
};

export default AdminManagementModal;