import React from 'react';
import AdminBoardHeaderNav from '../../../atoms/AdminBoardHeaderNav'
import AdminMyPageBox from '@/organisms/AdminMyPageBox';

const AdminMyPage = () => {
  return <div className='w-screen h-screen'>
    <AdminBoardHeaderNav></AdminBoardHeaderNav>
    <div className='flex w-full h-4/5 justify-center items-center'>
      <AdminMyPageBox />
    </div>
  </div>;
};

export default AdminMyPage;
