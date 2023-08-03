import React from 'react';
import BoardHeaderNav from '@/atoms/board/BoardHeaderNav';
import MyPageBox from '@/organisms/board/MyPageBox';

const dummy = {
  email: 'ssafy@naver.com', // [String] 팬 유저 이메일 id (필수)
  password: 'thisispassword', // [String] 팬 유저 비밀번호 (필수)
  name: '김싸피', //[String] 팬 유저 이름 (필수)
  nickname: 'hihello', // [String] 팬 유저 NICK NAME
  birthday: '2023-07-19T03:46:22.904', // [LocalDateTime] 팬 유저 생일
  phone: '010-0101-1111', // [String] 팬 유저 번호 (필수)
};

const MyPage = () => {
  return (
    <div>
      <BoardHeaderNav></BoardHeaderNav>
      <div className="flex w-full justify-center items-center">
        <MyPageBox
          isAdmin={false}
          email={dummy.email}
          name={dummy.name}
          nickname={dummy.nickname}
          phone={dummy.phone}
          birth={dummy.birthday}
        />
      </div>
    </div>
  );
};

export default MyPage;
