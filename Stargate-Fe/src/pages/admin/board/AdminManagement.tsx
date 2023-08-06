import React, { useState, useEffect } from 'react';
import AdminBoardHeaderNav from '../../../atoms/board/AdminBoardHeaderNav';
import AdminManagementModal from '@/organisms/board/AdminManagementModal';
import { fetchGroup } from '@/services/adminBoardService';

interface GroupData {
  groupNo: number;
  name: string;
  members: MemberData[];
}

interface MemberData {
  memberNo: number;
  name: string;
}

const AdminManagement = () => {
  const [groups, setGroups] = useState<GroupData[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      const data = await fetchGroup()
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
          <AdminManagementModal group={groups} />
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
