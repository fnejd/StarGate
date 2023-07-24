import React from 'react';
import BoardHeaderNav from '../../../components/atoms/BoardHeaderNav';
import MyPageBox from '../../../components/organisms/MyPageBox';

const myPage = () => {
  return <div className='h-screen w-screen'>
    <BoardHeaderNav></BoardHeaderNav>
    <div className='flex w-full justify-center items-center'>
      <MyPageBox />
    </div>
  </div>;
};

export default myPage;