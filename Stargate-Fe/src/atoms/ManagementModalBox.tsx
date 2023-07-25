import React, { useRef, MouseEvent } from 'react';

/**
 * InputComponent
 * @param isOpen => Modal이 열려있는지 확인하기 위한 boolean 변수
 * @param onClose => Modal창이 닫힐때 호출되는 콜백 함수, 인자x 리턴값x
 */

interface ModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManagementModalBox = ({ isOpen, onClose }: ModalBoxProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50'
          onClick={handleOutsideClick}
        >
          <div
            ref={modalRef}
            className='w-96 h-96 bg-white rounded-lg p-4'
          ></div>
        </div>
      )}
    </>
  );
};

export default ManagementModalBox;
