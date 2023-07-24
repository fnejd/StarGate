import React from 'react';

interface ModalPlusButtonProps {
  onClick: () => void;
}

const ModalPlusButton = (props: ModalPlusButtonProps) => {
  const { onClick } = props;

  return (
  <div>
    <div
      className="w-32 h-32 rounded-full bg-white flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center">
        <span className="text-white text-4xl">+</span>
      </div>
    </div>
  </div>
  );
};

export default ModalPlusButton;
