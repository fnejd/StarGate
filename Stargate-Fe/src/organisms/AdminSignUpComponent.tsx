import React, { useState } from 'react';
import InputComponent from '../atoms/InputComponent';
import PasswordFormComponent from './PasswordFormComponent';
import { useNavigate } from 'react-router-dom';

const AdminSignUpComponent = () => {
  const [emailText, setEmailText] = useState('사용 불가한 이메일입니다.');
  const [emailState, setEmailState] = useState('red');
  const [admin, setAdmin] = useState<object>({
    email: '',
    company: '',
    bizNum: '',
    pw: '',
    pwCheck: ''
  })

  const navigate = useNavigate();

  /**
   * 이메일 인증 결과를 이용해 emailState 값을 변경시켜
   * Input 컴포넌트에 프로퍼티로 전달해주기
   * 이메일 값을 함수 매개변수로 가져가야하려나
   * 그냥 인풋 태그 자체에서 가져가야 하려나
   * 따로 컴포넌트로 빼둔거라 함수 매개변수로 가져가는게 나으려나?
   */
  const verify = () => {
    console.log("AdminSignup AUth api 요청");
  };

  const signUp = () => {
    // 회원가입 요청 하기 전에 유효성 검사가 이루어져야할까요
    // 얼마나 이루어져야 할까요?
    console.log("관리자 회원가입 요청");
    navigate('/');
  }

  return (
    <div className="m-5">
      <p className="form-title">관리자 회원가입</p>
      <div className="flex items-center">
        <InputComponent
          text="이메일"
          type="email"
          notice={emailText}
          state={emailState}
          keyName="email"
          getter={admin}
          setter={setAdmin}
        />
        <button className="medium-white p3b min-w-max w-full h-10 rounded-lg" onClick={verify}>이메일 확인</button>
      </div>
      <div className="flex">
        <InputComponent text="회사명" type="text" keyName="company" getter={admin} setter={setAdmin} />
      </div>
      <div className="flex">
        <InputComponent text="사업자 번호" type="text" keyName="bizNum" getter={admin} setter={setAdmin} />
      </div>
      <div className="flex">
        <PasswordFormComponent text="비밀번호" getter={admin} setter={setAdmin} />
      </div>
      <div className="flex">
        <InputComponent text="비밀번호 확인" type="password" keyName="pwCheck" getter={admin} setter={setAdmin} />
      </div>
      <button className="medium-white" onClick={signUp}>회원가입</button>
    </div>
  )
}

export default AdminSignUpComponent;
