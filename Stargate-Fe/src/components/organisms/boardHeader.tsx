import React from 'react';
import BoardHeaderNav from '../atoms/BoardHeaderNav';
import BoardHeaderTitle from '../atoms/BoardHeaderTitle';

const BoardHeader = () => {
  return (
    <div className='w-full'>
      <BoardHeaderNav/>
      <BoardHeaderTitle/>
    </div>
  );
};

export default BoardHeader;
