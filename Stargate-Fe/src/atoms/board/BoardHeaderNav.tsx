import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutApi } from '@/services/authService';
import { fetchUserData } from '@/services/userBoardService';
import { fetchAdminData } from '@/services/adminBoardService';
import { UserData, AdminData } from '@/types/board/type';
import { nameShouldFetch } from '@/recoil/myPageState';
import { useRecoilState } from 'recoil';
import Swal from 'sweetalert2';

/**
 * @todo
 * 로그인 후 로그아웃하고 다시 로그인하면 이름 안뜸
 * 추후 react-query 사용해서 리팩토링
 */

const BoardHeaderNav = ({ isAdmin }: { isAdmin: boolean }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [nameFetch, setNameFetch] = useRecoilState(nameShouldFetch);

  useEffect(() => {
    const fetchData = async () => {
      if (nameFetch) {
        if (isAdmin) {
          const data = await fetchAdminData();
          setAdminData(data);
        } else {
          const data = await fetchUserData();
          setUserData(data);
        }
      }
      setNameFetch(false);
    };
    fetchData();
  }, [nameFetch]);

  const handleLogout = async () => {
    try {
      const result = await logoutApi();
      if (result === 'SUCCESS') {
        Swal.fire('성공!', '로그아웃을 완료했습니다.', 'success');
        navigate('/');
      } else {
        Swal.fire('어라?', result, 'warning');
      }
    } catch (error) {
    }
  };

  const nameDataFetch = () => {
    setNameFetch(true);
  };

  return (
    <div className="w-xl lg:h-16 sm:h-8 flex justify-end items-center">
      {isAdmin ? (
        <div className="flex w-1/3 justify-evenly">
          {adminData && <p className="text-white p1b">{adminData.name}님</p>}
          <NavLink
            className="text-white aria-[current=page]:p1b"
            to="/admin/board"
            onClick={nameDataFetch}
          >
            대시보드
          </NavLink>
          <NavLink
            className="text-white aria-[current=page]:p1b"
            to="/admin/management"
            onClick={nameDataFetch}
          >
            소속연예인 관리
          </NavLink>
          <NavLink
            className="text-white aria-[current=page]:p1b"
            to="/admin/mypage"
            onClick={nameDataFetch}
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
          <NavLink
            className="text-white aria-[current=page]:p1b"
            to="/board"
            onClick={nameDataFetch}
          >
            대시보드
          </NavLink>
          <NavLink
            className="text-white aria-[current=page]:p1b"
            to="/mypage"
            onClick={nameDataFetch}
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
      )}
    </div>
  );
};

export default BoardHeaderNav;
