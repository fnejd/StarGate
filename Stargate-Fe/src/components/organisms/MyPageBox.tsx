import React from 'react';
import InputComponent from '../atoms/InputComponent';

const MyPageBox = () => {
  return <div className='bg-black w-1/2 flex flex-col justify-center items-center'>
    <p className='text-white self-start'>마이페이지</p>
    <InputComponent type="text" text="이메일" notice={null} />
    <InputComponent type="text" text="이름" notice={null} />
    <InputComponent type="text" text="닉네임" notice={null} />
    <InputComponent type="text" text="비밀번호" notice={null} />
    <InputComponent type="text" text="변경할 비밀번호" notice={null} />
    <InputComponent type="text" text="변경할 비밀번호 확인" notice={null} />
    <InputComponent type="text" text="전화번호" notice={null} />
    <InputComponent type="text" text="생년월일" notice={null} />
  </div>
};

export default MyPageBox;