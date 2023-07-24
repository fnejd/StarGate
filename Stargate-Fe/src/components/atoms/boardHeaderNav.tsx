import React from 'react';
import { NavLink } from 'react-router-dom';

const BoardHeaderNav = () => {

  return <div className='lg:h-16 sm:h-8 flex justify-end items-center'>
    <div className='flex w-1/4 justify-evenly'>
      <NavLink className="text-black aria-[current=page]:p1b" to="/board">대시보드</NavLink>
      <NavLink className="text-black aria-[current=page]:p1b" to="/mypage">마이페이지</NavLink>
      <div>로그아웃</div>
    </div>
  </div>;
};

export default BoardHeaderNav;
