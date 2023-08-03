import React from 'react';
import BoardHeaderNav from '../../atoms/board/BoardHeaderNav';
import BoardHeaderTitle from '../../atoms/board/BoardHeaderTitle';

const BoardHeader = () => {
  return (
    <div className='w-full'>
      <BoardHeaderNav />
      <BoardHeaderTitle />
    </div>
  );
};

export default BoardHeader;
