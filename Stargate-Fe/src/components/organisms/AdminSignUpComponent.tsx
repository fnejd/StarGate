import React, { useState } from 'react';
import InputComponent from '../atoms/InputComponent';
import PasswordFormComponent from './PasswordFormComponent';

const AdminSignUpComponent = () => {
  const [emailState, setEmailState] = useState('red');

  const AdminSignUp = () => {
    console.log("AdminSignUp 요청");
  }

  return (
    <div className="m-5">
      <p className="form-title">회원가입</p>
      <div className="flex items-center">
        <InputComponent
          text="이메일"
          type="email"
          notice="사용 불가한 이메일입니다."
          state={emailState}
        />
        <button className="medium-white p3r min-w-max w-full h-10 rounded-lg">이메일 확인</button>
      </div>
      <div className="flex">
        <InputComponent text="회사명" type="text" notice={null} state={null} />
      </div>
      <div className="flex">
        <InputComponent text="사업자 번호" type="text" notice={null} state={null} />
      </div>
      <div className="flex">
        <PasswordFormComponent text="비밀번호" />
      </div>
      <div className="flex">
        <InputComponent text="비밀번호 확인" type="password" notice={null} state={null} />
      </div>
      <button className="medium-white" onClick={AdminSignUp}>회원가입</button>
    </div>
  )
}

export default AdminSignUpComponent;
