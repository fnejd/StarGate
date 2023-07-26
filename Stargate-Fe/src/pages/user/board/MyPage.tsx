import React from 'react';
import BoardHeaderNav from '@/atoms/BoardHeaderNav';
import MyPageBox from '@/organisms/MyPageBox';

const dummy = {
  email: 'YunHans@ssafy.com',
  name: '김수환',
  nickName: '유한스',
  phone: '019-2222-2333',
  birth: '2021년어쩌구',
};

const MyPage = () => {
  return (
    <div>
      <BoardHeaderNav></BoardHeaderNav>
      <div className='flex w-full justify-center items-center'>
        <MyPageBox
          isAdmin={false}
          email={dummy.email}
          name={dummy.name}
          nickName={dummy.nickName}
          phone={dummy.phone}
          birth={dummy.birth}
        />
      </div>
    </div>
  );
};

export default MyPage;
