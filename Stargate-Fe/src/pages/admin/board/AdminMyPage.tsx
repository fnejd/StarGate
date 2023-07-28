import React from 'react';
import AdminBoardHeaderNav from '@/atoms/board/AdminBoardHeaderNav';
import MyPageBox from '@/organisms/board/MyPageBox';

const dummy = {
  email: 'YunHans@ssafy.com',
  companyName: '수환컴퍼니',
  companyNum: 123456,
};

const AdminMyPage = () => {
  return (
    <div>
      <AdminBoardHeaderNav></AdminBoardHeaderNav>
      <div className='flex w-full justify-center items-center'>
        <MyPageBox
          isAdmin={true}
          email={dummy.email}
          companyName={dummy.companyName}
          companyNum={dummy.companyNum}
        />
      </div>
    </div>
  );
};

export default AdminMyPage;
