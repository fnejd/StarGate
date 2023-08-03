import React from 'react';
import BoardHeader from '@/organisms/board/BoardHeader';
import BoardCardBox from '@/organisms/board/BoardCardBox';
import BoardCardList from '@/organisms/board/BoardCardList';

const dummy = {
  today: [
    {
      uuid: '미팅고유번호1',
      name: '유한스의 하입보이',
      start_date: '7월 24일',
      waiting_time: '00:05',
      image: 'https://picsum.photos/id/188/720/400/',
    },
  ],
  future: [
    {
      uuid: '미팅고유번호3',
      name: '미팅이름3',
      start_date: '일시3',
      waiting_time: '남은시간3',
      image: 'https://picsum.photos/id/188/720/400/',
    },
    {
      uuid: '미팅고유번호4',
      name: '미팅이름4',
      start_date: '일시4',
      waiting_time: '남은시간4',
      image: 'https://picsum.photos/id/188/720/400/',
    },
    {
      uuid: '미팅고유번호5',
      name: '미팅이름5',
      start_date: '일시5',
      waiting_time: '남은시간5',
      image: 'https://picsum.photos/id/188/720/400/',
    },
  ],
  past: [
    {
      uuid: '미팅고유번호2',
      name: '미팅이름5',
      start_date: '일시5',
      image: 'https://picsum.photos/id/188/720/400/',
    },
    {
      uuid: '미팅고유번호6',
      name: '미팅이름6',
      start_date: '일시6',
      image: 'https://picsum.photos/id/188/720/400/',
    },
    {
      uuid: '미팅고유번호7',
      name: '미팅이름6',
      start_date: '일시6',
      image: 'https://picsum.photos/id/188/720/400/',
    },
    {
      uuid: '미팅고유번호8',
      name: '미팅이름7',
      start_date: '일시7',
      image: 'https://picsum.photos/id/188/720/400/',
    },
    {
      uuid: '미팅고유번호9',
      name: '미팅이름7',
      start_date: '일시7',
      image: 'https://picsum.photos/id/188/720/400/',
    },
  ],
};

const UserBoard = () => {
  return (
    <div className='w-xl h-screen'>
      <BoardHeader />
      <BoardCardBox
        uuid={dummy.today[0].uuid}
        imageSrc={dummy.today[0].image}
        title={dummy.today[0].name}
        date={dummy.today[0].start_date}
        time={dummy.today[0].waiting_time}
        isAdmin={false}
      />
      <p className="t3b text-center lg:my-14 sm:my-6 text-white">예정</p>
      <BoardCardList meetings={dummy.future} />
      <p className="t3b text-center lg:my-14 sm:my-6 text-white">리마인드</p>
      <BoardCardList meetings={dummy.past} />
    </div>
  );
};

export default UserBoard;
