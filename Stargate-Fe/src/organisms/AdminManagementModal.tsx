import React, { useState } from 'react';
import ModalPlusButton from '../atoms/ModalPlusButton';
import ManagementModalBox from '../atoms/ManagementModalBox';
import BtnBlue from '@/atoms/BtnBlue';

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
      <div className='border-2 w-l h-500 flex flex-col justify-between'>
        <div className='flex justify-between'>
          <div className='lg:w-1/5 flex justify-center'>
            <BtnBlue onClick={handleCircleClick} text={'그룹1'}></BtnBlue>
          </div>
          <div className='lg:w-1/5 flex justify-center'>
            <BtnBlue onClick={handleCircleClick} text={'그룹1'}></BtnBlue>
          </div>
          <div className='lg:w-1/5 flex justify-center'>
            <BtnBlue onClick={handleCircleClick} text={'그룹1'}></BtnBlue>
          </div>
          <div className='lg:w-1/5 flex justify-center'>
            <BtnBlue onClick={handleCircleClick} text={'그룹1'}></BtnBlue>
          </div>
          <div className='lg:w-1/5 flex justify-center'>
            <BtnBlue onClick={handleCircleClick} text={'그룹1'}></BtnBlue>
          </div>
        </div>
        <div className='self-end'>
          <ModalPlusButton onClick={handleCircleClick} />
        </div>
        <ManagementModalBox isOpen={isModalOpen} onClose={handleModalClose} />
      </div>
    </div>
  );
};

export default AdminManagementModal;
