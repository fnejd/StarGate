import React from 'react';
import AdminBoardHeaderNav from '@/atoms/board/AdminBoardHeaderNav';
import MyPageBox from '@/organisms/board/MyPageBox';

const dummy = {
  name: '수환컴퍼니',
  email: 'YunHans@ssafy.com',
  code : 123456,
};

const AdminMyPage = () => {
  return (
    <div>
      <AdminBoardHeaderNav></AdminBoardHeaderNav>
      <div className='flex w-full justify-center items-center'>
        <MyPageBox
          isAdmin={true}
          email={dummy.email}
          name={dummy.name}
          code={dummy.code}
        />
      </div>
    </div>
  );
};

export default AdminMyPage;
