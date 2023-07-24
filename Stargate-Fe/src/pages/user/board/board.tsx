import React from 'react';
import BoardHeader from '../../../components/organisms/BoardHeader';
import BoardCardBox from '../../../components/organisms/BoardCardBox';
import BoardCardList from '../../../components/organisms/BoardCardList';

const dummy = {
  Image: 'https://picsum.photos/id/188/720/400/',
  title: '유한스의 하입보이',
  date: '7월 24일',
  time: '00:05',
};

const board = () => {
  return (
    <div className='w-98vw h-screen'>
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

export default board;
