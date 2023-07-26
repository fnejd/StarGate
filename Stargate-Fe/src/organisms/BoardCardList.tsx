import React from 'react';
import BoardCard from '../atoms/BoardCard';

/**
 * InputComponent
 * @param imageSrc => 이미지 api 주소
 * @param title => Card flip시 보여줄 사인회 제목
 * @param date => Card flip시 보여줄 사인회 날짜
 * @param time => Card flip시 보여줄 남은 시간
 */

interface BoardCardProps {
  imageSrc: string;
  title?: string;
  date?: string;
  time?: string;
}

const BoardCardList = ({ imageSrc, title, date, time }: BoardCardProps) => {
  return (
    <div className="w-98vw h-5/6 lg:h-96 sm:h-56 flex justify-center">
      <div className='w-5/6 flex justify-evenly flex-wrap'>
        <div className='w-1/4 h-full'>
          <BoardCard imageSrc={imageSrc} title={title} date={date} time={time} />
        </div>
        <div className='w-1/4'>
          <BoardCard imageSrc={imageSrc} title={title} date={date} time={time} />
        </div>
        <div className='w-1/4'>
          <BoardCard imageSrc={imageSrc} title={title} date={date} time={time} />
        </div>
        <div className='w-1/4'>
          <BoardCard imageSrc={imageSrc} title={title} date={date} time={time} />
        </div>
      </div>
    </div>
  );
};

export default BoardCardList;