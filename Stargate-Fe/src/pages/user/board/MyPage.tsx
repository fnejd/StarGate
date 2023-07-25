import React from 'react';
import BoardHeaderNav from '@/atoms/BoardHeaderNav';
import MyPageBox from '@/organisms/MyPageBox';

const MyPage = () => {
  return <div className='h-screen w-screen'>
    <BoardHeaderNav></BoardHeaderNav>
    <div className='flex w-full justify-center items-center'>
      <MyPageBox />
    </div>
  </div>;
};

export default MyPage;