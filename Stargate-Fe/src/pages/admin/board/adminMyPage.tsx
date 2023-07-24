import React from 'react';
import AdminBoardHeaderNav from '../../../components/atoms/AdminBoardHeaderNav'
import AdminMyPageBox from '../../../components/organisms/AdminMyPageBox';

const adminMyPage = () => {
  return <div className='w-screen h-screen'>
    <AdminBoardHeaderNav></AdminBoardHeaderNav>
    <div className='flex w-full h-4/5 justify-center items-center'>
      <AdminMyPageBox />
    </div>
  </div>;
};

export default adminMyPage;
