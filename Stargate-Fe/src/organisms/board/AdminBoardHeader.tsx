import React from 'react';
import BoardHeaderTitle from '@/atoms/board/BoardHeaderTitle';
import BoardHeaderNav from '@/atoms/board/BoardHeaderNav';

const AdminBoardHeader = () => {
  return (
    <div className='w-full'>
      <BoardHeaderNav isAdmin={true} />
      <BoardHeaderTitle />
    </div>
  );
};

export default AdminBoardHeader;
