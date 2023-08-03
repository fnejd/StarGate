import React from 'react';
import InputComponent from '../../atoms/common/InputComponent';
import PasswordFormComponent from '../auth/PasswordFormComponent';
import TextButtonComponent from '@/atoms/common/TextButtonComponent';

/**
 * Todos
 * InputComponents 충돌 수정
 */

/**
 * MyPageBoxProps
 * @param isAdmin => admin 여부가 들어갈 boolean 변수, 값에 따라 다른 항목이 랜더링 됨
 */


interface MyPageBoxProps {
  isAdmin: boolean;
  email: string;
  name?: string;
  nickname?: string;
  phone?: string;
  birth?: string;
  code?: number;
}

const MyPageBox = (props: MyPageBoxProps) => {
  const {
    isAdmin,
    email,
    name,
    nickname,
    phone,
    birth,
    code,
  } = props;

  return (
    <div className='my-5 flex flex-col h-screen'>
      <p className='form-title text-white'>마이페이지</p>
      <div className='flex items-center'>
        <InputComponent text='이메일' type='email' value={email} />
      </div>
      {isAdmin ? (
        <>
          <div className='flex'>
            <InputComponent text='회사명' type='text' value={name} />
          </div>
          <div className='flex'>
            <InputComponent
              text='사업자 등록번호'
              type='text'
              value={code.toString()}
            />
          </div>
        </>
      ) : (
        <>
          <div className='flex'>
            <InputComponent text='이름' type='text' value={name} />
          </div>
          <div className='flex'>
            <InputComponent text='닉네임' type='text' value={nickname} />
          </div>
          <div className='flex'>
            <InputComponent text='전화번호' type='text' value={phone} />
          </div>
          <div className='flex'>
            <InputComponent text='생년월일' type='text' value={birth} />
          </div>
        </>
      )}
      <div className='flex'>
        <PasswordFormComponent text='비밀번호' />
      </div>
      <div className='flex'>
        <PasswordFormComponent text='새로운 비밀번호' />
      </div>
      <div className='flex'>
        <InputComponent text='새로운 비밀번호 확인' type='password' />
      </div>
      <button className='self-center medium-white mb-5'>수정하기</button>
      <div className='self-center text-black'>
        <TextButtonComponent text={'탈퇴하기'} black={true} />
      </div>
    </div>
  );
};

export default MyPageBox;
