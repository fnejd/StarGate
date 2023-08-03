import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const BtnBlue: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className="medium-white whitespace-nowrap overflow-ellipsis line-clamp-1" onClick={onClick}>
      {text}
    </button>
  );
};

export default BtnBlue;