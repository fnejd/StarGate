import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import AdminBoardHeaderNav from '../../../atoms/board/AdminBoardHeaderNav';
import AdminManagementModal from '@/organisms/board/AdminManagementModal';
import { fetchGroup } from '@/services/adminBoardService';
import { groupsState } from '@/recoil/adminManagementState';

const AdminManagement = () => {
  const [groups, setGroups] = useRecoilState(groupsState);

  useEffect(() => {
    const fetchData = async() => {
      const data = await fetchGroup();
      setGroups(data);
    }
    fetchData();
  }, []);

  return (
    <div className="w-xl h-screen">
      <AdminBoardHeaderNav />
      <div className="h-4/5 flex flex-col justify-around items-center">
        <p className="form-title">소속 연예인 관리</p>
        <div>
          <AdminManagementModal/>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
