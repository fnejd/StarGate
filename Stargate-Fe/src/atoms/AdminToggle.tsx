import React, { useEffect, useState } from 'react';

interface AdminToggleProps {
  photoTime: boolean;
  setPhotoTime: (value: boolean) => void;
}

const AdminToggle = ({ photoTime, setPhotoTime }: AdminToggleProps) => {
  // const [photoTime, setPhotoTime] = useState<boolean>(false);

  const handleToggle = () => {
    setPhotoTime((prevState: boolean) => !prevState);
  };

  return (
    <div
      className={`w-14 h-7 ${
        photoTime ? 'bg-mainblue' : 'bg-black'
      } rounded-full relative cursor-pointer toggle-switch
      `}
      onClick={handleToggle}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full absolute top-4 transform -translate-y-1/2 transition-transform switch ${
          photoTime ? 'translate-x-0' : 'translate-x-8'
        }`}
      ></div>
    </div>
  );
};

export default AdminToggle;
