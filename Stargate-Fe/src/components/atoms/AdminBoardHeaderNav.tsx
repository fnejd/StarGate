import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminBoardHeaderNav = () => {

  return <div className='w-full lg:h-16 sm:h-8 flex justify-end items-center'>
    <div className='flex w-1/3 justify-evenly'>
      <NavLink className="text-black aria-[current=page]:p1b" to="/admin/board">대시보드</NavLink>
      <NavLink className="text-black aria-[current=page]:p1b" to="/admin/management">소속연예인 관리</NavLink>
      <NavLink className="text-black aria-[current=page]:p1b" to="/admin/mypage">마이페이지</NavLink>
      <div>로그아웃</div>
    </div>
  </div>;
};

export default AdminBoardHeaderNav;
