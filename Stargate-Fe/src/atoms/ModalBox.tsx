import React, { useRef, MouseEvent } from 'react';

interface ModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalBox = ({ isOpen, onClose }: ModalBoxProps) => {
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
        className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50"
        onClick={handleOutsideClick}
      >
        <div ref={modalRef} className="w-96 h-96 bg-white rounded-lg p-4">
        </div>
      </div>
    )}
  </>
  );
};

export default ModalBox;
