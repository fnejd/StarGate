import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const BtnWhite: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className="medium-blue" onClick={onClick}>
      {text}
    </button>
  );
};

export default BtnWhite;