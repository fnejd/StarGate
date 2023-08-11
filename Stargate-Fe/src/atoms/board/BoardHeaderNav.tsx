import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutApi } from '@/services/authService';
import { fetchUserData } from '@/services/userBoardService';
import { fetchAdminData } from '@/services/adminBoardService';
import { UserData, AdminData } from '@/types/board/type';

/**
 * @todo
 * 추후 react-query 사용해서 리팩토링
 */

const BoardHeaderNav = ({ isAdmin }: { isAdmin: boolean }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [adminData, setAdminData] = useState<AdminData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isAdmin) {
        const data = await fetchAdminData();
        setAdminData(data);
      } else {
        const data = await fetchUserData();
        setUserData(data);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const result = await logoutApi();
      if (result === 'SUCCESS') {
        alert('로그아웃 완료');
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
      {isAdmin ? (
        <div className="flex w-1/3 justify-evenly">
          {adminData && <p className="text-white p1b">{adminData.name}님</p>}
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
          <div
            className="text-white hover:text-opacity-50 hover:cursor-pointer"
            onClick={handleLogout}
          >
            로그아웃
          </div>
        </div>
      ) : (
        <div className="flex w-1/4 justify-evenly">
          {userData && <p className="text-white p1b">{userData.name}님</p>}
          <NavLink className="text-white aria-[current=page]:p1b" to="/board">
            대시보드
          </NavLink>
          <NavLink className="text-white aria-[current=page]:p1b" to="/mypage">
            마이페이지
          </NavLink>
          <div
            className="text-white hover:text-opacity-50 hover:cursor-pointer"
            onClick={handleLogout}
          >
            로그아웃
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardHeaderNav;
