import React, { useState, useEffect } from 'react';
import AdminBoardHeaderNav from '../../../atoms/board/AdminBoardHeaderNav';
import AdminManagementModal from '@/organisms/board/AdminManagementModal';
import { fetchGroup } from '@/services/adminBoard';

const dummy = [
  {
    groupNo: 1,
    name: '406s',
    members: [
      {
        memberNo: 1,
        name: '정예륜',
      },
      {
        memberNo: 2,
        name: '김도현',
      },
      {
        memberNo: 2,
        name: '박찬호처럼체인지업',
      },
      {
        memberNo: 3,
        name: '이의찬',
      },
    ],
  },
  {
    groupNo: 2,
    name: '유한스',
    members: [
      {
        memberNo: 4,
        name: '이유한',
      },
      {
        memberNo: 5,
        name: '현실누나',
      },
      {
        memberNo: 6,
        name: '김수환',
      },
    ],
  },
];

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
