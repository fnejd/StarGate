import React from 'react';
import AdminBoardHeaderNav from '../../atoms/board/AdminBoardHeaderNav';
import BoardHeaderTitle from '@/atoms/board/BoardHeaderTitle';

const AdminBoardHeader = () => {
  return (
    <div className='w-full'>
      <AdminBoardHeaderNav />
      <BoardHeaderTitle />
    </div>
  );
};

export default AdminBoardHeader;
