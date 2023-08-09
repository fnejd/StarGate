import { useEffect } from 'react';
import AdminBoardHeaderNav from '../../../atoms/board/AdminBoardHeaderNav';
import AdminManagementModal from '@/organisms/board/AdminManagementModal';
import { fetchGroup } from '@/services/adminBoardService';
import { useRecoilState } from 'recoil';
import { groupsState, groupsShouldFetch } from '@/recoil/adminManagementState';

const AdminManagement = () => {
  const [groups, setGroups] = useRecoilState(groupsState);
  const [groupsFetch, setGroupsFetch] = useRecoilState(groupsShouldFetch);

  useEffect(() => {
    const fetchData = async () => {
      if (groupsFetch) {
        const data = await fetchGroup();
        setGroups(data);
        setGroupsFetch(false);
      }
    };
    fetchData();
  }, [groupsFetch]);
  return (
    <div className="w-xl h-screen">
      <AdminBoardHeaderNav />
      <div className="h-4/5 flex flex-col justify-around items-center">
        <p className="form-title">소속 연예인 관리</p>
        <div>
          <AdminManagementModal group={groups} />
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
