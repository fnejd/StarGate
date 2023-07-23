import React from 'react';
import AdminBoardHeaderNav from '../../../components/atoms/AdminBoardHeaderNav'
import AdminManagementModal from '../../../components/atoms/AdminManagementModal';

const adminManagement = () => {
  return <div>
    <AdminBoardHeaderNav />
    관리자 연예인관리
    <AdminManagementModal />
  </div>;
};

export default adminManagement;
