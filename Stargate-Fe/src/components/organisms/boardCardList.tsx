import React from 'react';
import BoardCard from '../atoms/BoardCard';

const BoardCardList = () => {
  return <div className="h-5/6 w-full lg:h-96 md:h-56 sm:h-56 flex justify-center">
    <div className='w-3/4 flex justify-evenly'>
      <div className='p-4 sm:w-1/2 lg:w-1/5 h-full'>
        <BoardCard />
      </div>
      <div className='p-4 sm:w-1/2 lg:w-1/5'>
        <BoardCard />
      </div>
      <div className='p-4 sm:w-1/2 lg:w-1/5'>
        <BoardCard />
      </div>
      <div className='p-4 sm:w-1/2 lg:w-1/5'>
        <BoardCard />
      </div>
    </div>
  </div>;
};

export default BoardCardList;
