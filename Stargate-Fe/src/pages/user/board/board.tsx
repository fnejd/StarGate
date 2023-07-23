import React from 'react';
import BoardHeader from '../../../components/organisms/BoardHeader';
import BoardCardBox from '../../../components/organisms/BoardCardBox';
import BoardCardList from '../../../components/organisms/BoardCardList';
const board = () => {
  return <div className='h-screen'>
    <BoardHeader></BoardHeader>
    <BoardCardBox />
    <p className='t3b text-center lg:mt-14 sm:mt-6'>예정</p>
    <BoardCardList />
    <p className='t3b text-center lg:mt-14 sm:mt-6'>리마인드</p>
    <BoardCardList />
  </div>;
};

export default board;
