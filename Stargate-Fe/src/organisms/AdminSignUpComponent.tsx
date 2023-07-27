import React, { useState } from 'react';
import InputComponent from '../atoms/InputComponent';
import PasswordFormComponent from './PasswordFormComponent';
import { useNavigate } from 'react-router-dom';

interface adminType {
  email: string;
  company: string;
  bizNum: string;
  pw: string;
  pwCheck: string;
}

const AdminSignUpComponent = () => {
  const [emailText, setEmailText] = useState('사용 불가한 이메일입니다.');
  const [emailState, setEmailState] = useState('red');
  const [admin, setAdmin] = useState<object>({
    email: '',
    company: '',
    bizNum: '',
    pw: '',
    pwCheck: '',
  });

  const navigate = useNavigate();

  const verify = () => {
    console.log('AdminSignup AUth api 요청');
    // get으로 보내달라 함 쿼리스트링으루
    // 리턴으론 불리언
    // const response = email 중복 검사 요청 api 호출
    // if (response가 true라면 ) {
    //   setEmailText('사용 가능한 이메일입니다.');
    //   setEmailState('green');
    // } else {
    //   setEmailText('사용 불가한 이메일입니다.');
    //   setEmailState('red');
    // }
  };

  const submit = () => {
    const formData = new FormData();
    formData.append('email', (admin as adminType).email);
    formData.append('name', (admin as adminType).company);
    formData.append('code', (admin as adminType).bizNum);
    formData.append('password', (admin as adminType).pw);

    console.log(formData);
  };

  const signUp = () => {
    // 회원가입 요청 하기 전에 유효성 검사가 이루어져야할까요
    // 얼마나 이루어져야 할까요?

    // pw Checking
    const pw = (admin as adminType).pw;
    const pwCheck = (admin as adminType).pwCheck;
    // 비밀번호가 일치하지 않는 경우
    if (pw != pwCheck || pw.length == 0) {
      alert('비밀번호가 일치하지 않습니다.');
      return 0;
    }

    submit();
    navigate('/');
  };

  return (
    <div className="max-w-sm ml-auto mr-auto text-center">
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
        <button
          className="medium-white captionb w-1/3 h-10 rounded-lg"
          onClick={verify}
        >
          이메일 확인
        </button>
      </div>
      <div className="flex">
        <InputComponent
          text="회사명"
          type="text"
          keyName="company"
          getter={admin}
          setter={setAdmin}
        />
      </div>
      <div className="flex">
        <InputComponent
          text="사업자 번호"
          type="text"
          keyName="bizNum"
          getter={admin}
          setter={setAdmin}
        />
      </div>
      <div className="flex">
        <PasswordFormComponent
          text="비밀번호"
          getter={admin}
          setter={setAdmin}
        />
      </div>
      <div className="flex">
        <InputComponent
          text="비밀번호 확인"
          type="password"
          keyName="pwCheck"
          getter={admin}
          setter={setAdmin}
        />
      </div>
      <button className="medium-white" onClick={signUp}>
        회원가입
      </button>
    </div>
  );
};

export default AdminSignUpComponent;
