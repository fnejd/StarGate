import React from 'react';
import BoardCard from '../atoms/BoardCard';

interface BoardCardBoxProps {
  imageSrc: string;
  title: string;
  date: string;
  time: string;
  isAdmin: boolean;
}


const BoardCardBox = ({ imageSrc, title, date, time, isAdmin }: BoardCardBoxProps) => {
  return <div className='flex justify-center'>
    <div className='w-5/6 lg:h-96 md:h-56 sm:h-56 flex justify-center items-center backdrop-opacity-50 bg-blue-500 rounded-lg'>
      <div className='w-5/6 h-5/6 flex justify-center'>
        <BoardCard 
        imageSrc={imageSrc} />
        <div className='h-3/4 flex flex-col flex-grow justify-evenly mx-6'>
          <h1>{title}</h1>
          <div className='flex'>
            <div className='flex flex-col w-1/3'>
              <div className='flex justify-between'>
                <p>일시</p>
                <p>{date}</p>
              </div>
                <div className='flex justify-between'>
                <p>남은시간</p>
                <p>{time}</p>
              </div>
            </div>
            <div className='w-2/3 flex justify-end'>
            {isAdmin ? (
                <button>상세보기</button>
              ) : (
                <button>입장하기</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default BoardCardBox;
