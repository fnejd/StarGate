import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const BtnBlue: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className="medium-white" onClick={onClick}>
      {text}
    </button>
  );
};

export default BtnBlue;