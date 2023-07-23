import React from 'react';
import BoardHeader from '../../../components/atoms/BoardHeaderNav';
import MyPageBox from '../../../components/organisms/MyPageBox';
const myPage = () => {
  return <div className='h-screen'>
    <BoardHeader></BoardHeader>
    <div className='flex w-full h-4/5 justify-center items-center'>
      <MyPageBox />
    </div>
  </div>;
};

export default myPage;
