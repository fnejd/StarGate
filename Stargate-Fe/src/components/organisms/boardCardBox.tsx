import React from 'react';
import BoardCard from '../atoms/BoardCard';

const BoardCardBox = () => {
  return <div className='w-screen flex justify-center'>
    <div className='w-5/6 lg:h-96 md:h-56 sm:h-56 flex justify-center items-center backdrop-opacity-50 bg-blue-500 rounded-lg'>
      <div className='w-5/6 h-5/6 flex'>
        <BoardCard />
        <div className='flex flex-col flex-grow justify-evenly mx-6'>
          <h1>유진스 팬사인회</h1>
          <div className='flex justify-between '>
            <div className='flex w-1/5 justify-between'>
              <p>일시</p>
              <p>어쩌구</p>
            </div>
            <button>입장하기</button>
          </div>
          <div className='flex w-1/5 justify-between'>
            <p>남은시간</p>
            <p>저쩌구</p>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default BoardCardBox;
