import React from 'react';

interface AdminBtnProps {
  text: string;
  onClick: () => void;
}

const AdminBtn: React.FC<AdminBtnProps> = ({ text, onClick }) => {
  return (
    <button
      className="w-14 h-8 text-12 font-medium bg-admingray font-suit text-black rounded-sm"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default AdminBtn;
