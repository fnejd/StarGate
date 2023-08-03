import React from 'react';
import AdminBoardHeaderNav from '../../../atoms/board/AdminBoardHeaderNav';
import AdminManagementModal from '@/organisms/board/AdminManagementModal';

/**
 * Todos
 * Modal 클릭시 이름 출력 수정
 */

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
  {
    groupNo: 3,
    name: '수환없는수환팀',
    members: [
      {
        memberNo: 7,
        name: '프론트',
      },
      {
        memberNo: 8,
        name: '제7의멤버',
      },
      {
        memberNo: 9,
        name: '야랩몬스터',
      },
    ],
  },
  {
    groupNo: 4,
    name: '프론트',
    members: [
      {
        memberNo: 10,
        name: '플러터',
      },
      {
        memberNo: 11,
        name: '코틀린',
      },
    ],
  },
  {
    groupNo: 5,
    name: '모바일',
    members: [
      {
        memberNo: 12,
        name: '두산베어스',
      },
    ],
  },
  {
    groupNo: 6,
    name: '어쩌구',
    members: [
      {
        memberNo: 13,
        name: '프론트1',
      },
      {
        memberNo: 14,
        name: '프론트2',
      },
      {
        memberNo: 15,
        name: '프론트3',
      },
      {
        memberNo: 16,
        name: '프론트4',
      },
      {
        memberNo: 17,
        name: '프론트5',
      },
      {
        memberNo: 18,
        name: '프론트6',
      },
      {
        memberNo: 19,
        name: '프론트7',
      },
      {
        memberNo: 20,
        name: '프론트8',
      },
      {
        memberNo: 21,
        name: '프론트9',
      },
      {
        memberNo: 22,
        name: '프론트10',
      },
    ],
  },
];

const AdminManagement = () => {
  return (
    <div className="w-xl h-screen">
      <AdminBoardHeaderNav />
      <div className="h-4/5 flex flex-col justify-around items-center">
        <p className="form-title">소속 연예인 관리</p>
        <div>
          <AdminManagementModal group={dummy} />
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
