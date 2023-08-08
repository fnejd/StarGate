import { useEffect, useState } from 'react';
import AdminBoardHeaderNav from '@/atoms/board/AdminBoardHeaderNav';
import MyPageBox from '@/organisms/board/MyPageBox';
import { fetchAdminData } from '@/services/adminBoardService';

interface AdminData {
  name : string;
  email : string;
  code : string;
}

const AdminMyPage = () => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAdminData();
      setAdminData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <AdminBoardHeaderNav></AdminBoardHeaderNav>
      <div className="flex w-full justify-center items-center">
        <MyPageBox
          isAdmin={true}
          email={adminData?.email || ''}
          name={adminData?.name || ''}
          code={adminData?.code || ''}
        />
      </div>
    </div>
  );
};

export default AdminMyPage;
