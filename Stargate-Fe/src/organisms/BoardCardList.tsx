import React from 'react';
import BoardCard from '../atoms/BoardCard';

interface BoardCardProps {
  imageSrc: string;
  title?: string;
  date?: string;
  time?: string;
}

const BoardCardList = ({ imageSrc, title, date, time }: BoardCardProps) => {
  return (
    <div className="w-98vw h-5/6 lg:h-96 sm:h-56 flex justify-center">
      <div className='w-5/6 flex justify-evenly flex-wrap'>
        <div className='w-1/4 h-full'>
          <BoardCard imageSrc={imageSrc} title={title} date={date} time={time} />
        </div>
        <div className='w-1/4'>
          <BoardCard imageSrc={imageSrc} title={title} date={date} time={time} />
        </div>
        <div className='w-1/4'>
          <BoardCard imageSrc={imageSrc} title={title} date={date} time={time} />
        </div>
        <div className='w-1/4'>
          <BoardCard imageSrc={imageSrc} title={title} date={date} time={time} />
        </div>
      </div>
    </div>
  );
};

export default BoardCardList;