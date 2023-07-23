import React from 'react';
import AdminBoardHeaderNav from '../atoms/AdminBoardHeaderNav'
import BoardHeaderTitle from '../atoms/BoardHeaderTitle';

const AdminBoardHeader = () => {
  return (
    <div>
      <AdminBoardHeaderNav></AdminBoardHeaderNav>
      <BoardHeaderTitle></BoardHeaderTitle>
    </div>
  );
};

export default AdminBoardHeader;