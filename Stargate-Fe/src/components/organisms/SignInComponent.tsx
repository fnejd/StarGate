import React from 'react'
import InputComponent from '../atoms/InputComponent';

const SignInComponent = () => {
  return (
    <div>
      <InputComponent type="text" text="이메일" notice={null} />
      <InputComponent type="password" text="비밀번호" notice="일치하지 않는 형식입니다." />
    </div>
  )
}

export default SignInComponent;