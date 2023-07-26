import React from 'react';
import BoardHeader from '@/organisms/BoardHeader';
import BoardCardBox from '@/organisms/BoardCardBox';
import BoardCardList from '@/organisms/BoardCardList';

const dummy = {
  Image: 'https://picsum.photos/id/188/720/400/',
  title: '유한스의 하입보이',
  date: '7월 24일',
  time: '00:05',
};

  /**
   * Json으로 값 가져와서
   * map으로 반복문 돌려서 갯수만큼 출력할 계획
   */

const UserBoard = () => {
  return (
    <div className='w-xl h-screen'>
      <BoardHeader/>
      <BoardCardBox
        imageSrc={dummy.Image}
        title={dummy.title}
        date={dummy.date}
        time={dummy.time}
        isAdmin={false}
      />
      <p className='t3b text-center lg:my-14 sm:my-6'>예정</p>
      <BoardCardList
        imageSrc={dummy.Image}
        title={dummy.title}
        date={dummy.date}
        time={dummy.time}
      />
      <p className='t3b text-center lg:my-14 sm:my-6'>리마인드</p>
      <BoardCardList
        imageSrc={dummy.Image}
        title={dummy.title}
        date={dummy.date}
        time={dummy.time}
      />
    </div>
  );
};

export default UserBoard;
