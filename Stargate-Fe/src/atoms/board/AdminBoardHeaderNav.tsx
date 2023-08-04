import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutApi } from '@/services/authService';

/**
 * @todo 
 * 추후 react-query 사용해서 리팩토링
 */

const AdminBoardHeaderNav = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const result = await logoutApi();
      
      if (result === 'SUCCESS') {
        alert('로그아웃 완료')
        navigate('/');
      } else {
        alert(result);
      }
    } catch (error) {
      console.log('로그아웃 에러:', error);
    }
  };

  return (
    <div className="w-xl lg:h-16 sm:h-8 flex justify-end items-center">
      <div className="flex w-1/3 justify-evenly">
        <NavLink
          className="text-white aria-[current=page]:p1b"
          to="/admin/board"
        >
          대시보드
        </NavLink>
        <NavLink
          className="text-white aria-[current=page]:p1b"
          to="/admin/management"
        >
          소속연예인 관리
        </NavLink>
        <NavLink
          className="text-white aria-[current=page]:p1b"
          to="/admin/mypage"
        >
          마이페이지
        </NavLink>
        <div className="text-white" onClick={handleLogout}>로그아웃</div>
      </div>
    </div>
  );
};

export default AdminBoardHeaderNav;
