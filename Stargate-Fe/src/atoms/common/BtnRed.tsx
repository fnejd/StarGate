import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const BtnRed: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className="medium-blue bg-red" onClick={onClick}>
      {text}
    </button>
  );
};

export default BtnRed;
