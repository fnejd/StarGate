import { useEffect, useState } from 'react';
import BoardHeaderNav from '@/atoms/board/BoardHeaderNav';
import MyPageBox from '@/organisms/board/MyPageBox';
import { fetchUserData } from '@/services/userBoardService';

interface UserData {
  email: string;
  password: string;
  name: string;
  nickname: string;
  birthday: string;
  phone: string;
}

const MyPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserData();
      setUserData(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <BoardHeaderNav></BoardHeaderNav>
      <div className="flex w-full justify-center items-center">
        <MyPageBox
          isAdmin={false}
          email={userData?.email || ''}
          name={userData?.name || ''}
          nickname={userData?.nickname || ''}
          phone={userData?.phone || ''}
          birthday={userData?.birthday || ''}
        />
      </div>
    </div>
  );
};

export default MyPage;
