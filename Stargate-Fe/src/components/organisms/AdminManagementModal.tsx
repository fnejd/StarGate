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
      <ModalPlusButton onClick={handleCircleClick} />
      <ModalBox isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default AdminManagementModal;