import React, { useState, useEffect } from 'react';

const PhotoTimer = ({ onPhotoTaken }) => {
  const [photoTime, setPhotoTime] = useState<number>(10);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('포토타임!');
      if (photoTime === 1) {
        setPhotoTime(photoTime - 1);
      } else if (photoTime === 0) {
        // 타이머가 끝날 경우
        console.log('포토 타이머 끝%%%');
        onPhotoTaken(); // 사진을 찍었다는 이벤트를 부모 컴포넌트로 전달
      }
    }, 1000); // 1초마다 실행

    return () => {
      clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
    };
  }, [photoTime, onPhotoTaken]);

  return (
    <div className="bg-black opacity-30 z-10 text-center fixed inset-0 flex items-center justify-center">
      <span>{photoTime}</span>
    </div>
  );
};

export default PhotoTimer;
