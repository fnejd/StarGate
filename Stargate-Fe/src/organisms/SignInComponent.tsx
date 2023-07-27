import React, { useEffect, useState } from 'react';
import InputComponent from '../atoms/InputComponent';
import TextButtonComponent from '../atoms/TextButtonComponent';
import BtnBlue from '@/atoms/BtnBlue';

interface userType {
  email: string;
  pw: string;
}

const SignInComponent = () => {
  const [pwText, setPwText] = useState('일치하지 않는 형식입니다.');
  const [pwState, setPwState] = useState('red');
  const [user, setUser] = useState<object>({
    email: '',
    pw: '',
  });

  // 패스워드 유효성 검사 부분
  useEffect(() => {
    const password = (user as userType).pw;

    // Password 유효성에 어떤 부분들이 더 들어가야할까?
    // 8자 이상에 영문 숫자 특문 1개씩 이상 포함??
    if (password.length >= 8) {
      setPwState('green');
      setPwText('올바른 비밀번호 형식입니다.');
    } else {
      setPwState('red');
      setPwText('일치하지 않는 형식입니다.');
    }
    console.log(user);
  }, [user]);

  const Login = () => {
    // 로그인 요청 부분
    // if ()

    // User 객체 FormData로 변환
    const formData = new FormData();

    formData.append('email', (user as userType).email);
    formData.append('password', (user as userType).pw);

    console.log(formData);

    // 로그인 요청 하고 난 뒤 성공 시에
    // 로그인 유지 체크 박스 값 체크 되었는지 검사한 후
    // 체크 되어 있으면 로컬 스토리지에 토큰 저장해주기
    // 그 후 어드민과 일반 유저 구분하여 대쉬보드로 네비게이트!
  };

  return (
    <div className="max-w-sm ml-auto mr-auto items-center">
      <InputComponent
        type="text"
        text="이메일"
        keyName="email"
        getter={user}
        setter={setUser}
      />
      <InputComponent
        type="password"
        text="비밀번호"
        notice={pwText}
        state={pwState}
        keyName="pw"
        getter={user}
        setter={setUser}
      />
      <div className="flex text-white m-2 p2r">
        <input type="checkbox" className="ml-2 mr-2" />
        로그인 유지
      </div>
      <div className="flex justify-center">
        <BtnBlue text="로그인" onClick={Login} />
      </div>
      <div className="flex text-slate-50 p2r mt-2 w-full justify-center">
        <div className="flex">
          <TextButtonComponent text="아이디" link="/idinquiry" />
          <div className="text-slate-50 p3r">
            <p>또는</p>
          </div>
          <TextButtonComponent text="비밀번호 찾기" link="/pwinquiry" />
          &nbsp;/&nbsp;
          <TextButtonComponent text="회원가입" link="/signup" />
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
