import React, { useState } from 'react';
import InputComponent from '@/atoms/common/InputComponent';
import PasswordFormComponent from './PasswordFormComponent';
import { useNavigate } from 'react-router-dom';
import { adminSignUpApi, adminVerifyEmail } from '@/services/userService';
import { adminValidationCheck } from '@/hooks/useValidation';

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
    const email = (admin as adminType).email;

    const response = adminVerifyEmail(email);

    if (response) {
      setEmailText('사용 가능한 이메일입니다.');
      setEmailState('green');
    } else {
      setEmailText('사용 불가한 이메일입니다.');
      setEmailState('red');
    }
  };

  const adminSignUp = () => {
    const validation = adminValidationCheck((admin as adminType));
    if (validation != 'SUCCESS') {
      alert(validation);
      window.location.reload();
      return 0;
    }

    const formData = new FormData();
    formData.append('email', (admin as adminType).email);
    formData.append('name', (admin as adminType).company);
    formData.append('code', (admin as adminType).bizNum);
    formData.append('password', (admin as adminType).pw);

    console.log(adminSignUpApi(formData));
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
      <button className="medium-white" onClick={adminSignUp}>
        회원가입
      </button>
    </div>
  );
};

export default AdminSignUpComponent;
