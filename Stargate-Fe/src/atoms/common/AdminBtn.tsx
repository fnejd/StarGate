import React from 'react';

interface AdminBtnProps {
  text: string;
  onClick: () => void;
  large?: boolean;
}

const AdminBtn: React.FC<AdminBtnProps> = ({ text, onClick, large = false}) => {
  return (
    <button className={`${ large ? 'w-16' : 'w-24'} h-8 text-12 font-medium bg-admingray font-suit text-black rounded-sm`} onClick={onClick}>
      {text}
    </button>
  );
};

export default AdminBtn;
