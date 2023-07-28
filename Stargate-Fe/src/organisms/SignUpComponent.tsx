import React, { useState } from 'react';
import InputComponent from '../atoms/InputComponent';
import PasswordFormComponent from './PasswordFormComponent';
import BtnBlue from '@/atoms/BtnBlue';
import { redirect, useFormAction, useNavigate } from 'react-router-dom';
import { signUpApi } from '@/services/userService';

interface userType {
  email: string;
  name: string;
  nickname: string;
  pw: string;
  pwCheck: string;
  phone: string;
  birth: string;
}

const SignUpComponent = () => {
  const [emailText, setEmailText] = useState('');
  const [emailState, setEmailState] = useState('red');
  const [user, setUser] = useState<object>({
    email: '',
    name: '',
    nickname: '',
    pw: '',
    pwCheck: '',
    phone: '',
    birth: '',
  });

  const navigate = useNavigate();

  const verify = () => {
    console.log('api 요청');
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

  const signUp = () => {
    // pw Checking
    const pw = (user as userType).pw;
    const pwCheck = (user as userType).pwCheck;
    // 일치하지 않는 경우
    if (pw != pwCheck || pw.length == 0) {
      alert('비밀번호가 일치하지 않습니다.');
      window.location.reload();
      return 0;
    }

    // phoneNumber formatting & Checking
    const phone = (user as userType).phone;
    const numArr = phone.split('');

    if (numArr[0] != '0' || numArr[1] != '1' || numArr.length != 11) {
      alert('잘못된 전화번호 형식입니다.');
      window.location.reload();
      return 0;
    }

    let newPhone = '0';
    numArr.map((num, i) => {
      if (i == 0) return;
      if (i == 3 || i == 7) newPhone += '-';
      newPhone += num;
    });

    const formData = new FormData();

    formData.append('email', (user as userType).email);
    formData.append('name', (user as userType).name);
    formData.append('nickname', (user as userType).nickname);
    formData.append('password', (user as userType).pw);
    formData.append('phone', newPhone);
    formData.append('birthday', `${(user as userType).birth}T00:00:00.000`);

    const response = signUpApi(formData);

    console.log(response);
    navigate('/');
  };

  return (
    <div className="m-5 max-w-sm ml-auto mr-auto text-center">
      <p className="form-title">회원가입</p>
      <div className="flex items-center">
        <InputComponent
          text="이메일"
          type="email"
          notice={emailText}
          state={emailState}
          keyName="email"
          getter={user}
          setter={setUser}
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
          text="이름"
          type="text"
          keyName="name"
          getter={user}
          setter={setUser}
        />
      </div>
      <div className="flex">
        <InputComponent
          text="닉네임"
          type="text"
          keyName="nickname"
          getter={user}
          setter={setUser}
        />
      </div>
      <div className="flex">
        <PasswordFormComponent text="비밀번호" getter={user} setter={setUser} />
      </div>
      <div className="flex">
        <InputComponent
          text="비밀번호 확인"
          type="password"
          keyName="pwCheck"
          getter={user}
          setter={setUser}
        />
      </div>
      <div className="flex">
        <InputComponent
          text="전화번호"
          type="text"
          keyName="phone"
          getter={user}
          setter={setUser}
        />
      </div>
      <div className="flex">
        <InputComponent
          text="생년월일"
          type="date"
          keyName="birth"
          getter={user}
          setter={setUser}
        />
      </div>
      <BtnBlue text="회원가입" onClick={signUp} />
    </div>
  );
};

export default SignUpComponent;
