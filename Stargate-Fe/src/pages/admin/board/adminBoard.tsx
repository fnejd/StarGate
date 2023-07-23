import React from 'react';
import AdminBoardHeader from '../../../components/atoms/AdminBoardHeaderNav'
import BoardCardBox from '../../../components/organisms/BoardCardBox';
import BoardCardList from '../../../components/organisms/BoardCardList';

const adminBoard = () => {
  return <div className='h-screen'>
    <AdminBoardHeader></AdminBoardHeader>
    <BoardCardBox />
    <p className='t3b text-center lg:mt-14 sm:mt-6'>예정</p>
    <BoardCardList />
    <p className='t3b text-center lg:mt-14 sm:mt-6'>리마인드</p>
    <BoardCardList />
  </div>;
};

export default adminBoard;
