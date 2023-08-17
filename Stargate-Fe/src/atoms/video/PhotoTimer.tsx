import React, { useState, useEffect } from 'react';

const PhotoTimer = ({ onPhotoTaken }) => {
  const [photoTime, setPhotoTime] = useState<number>(10);
  const [flash, setFlash] = useState<boolean>(false); // 추가된 부분

  const handleFlash = () => {
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
    }, 0);
  };

  console.log('사진촬영 타이머', photoTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (photoTime >= 1) {
        setPhotoTime(photoTime - 1);
      }
    }, 1000); // 1초마다 실행

    return () => {
      clearInterval(intervalId);
    };
  }, [photoTime]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (photoTime === 1) {
        // 타이머가 끝날 경우
        handleFlash();
        onPhotoTaken();
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [photoTime]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        flash ? 'bg-white' : ''
      }`}
    >
      <span className="font-italic">촬영 준비!</span>
      <span
        className={`timer-number font-italic ${flash ? 'text-black' : 'z-15'}`}
      >
        {photoTime}
      </span>
    </div>
  );
};

export default PhotoTimer;
