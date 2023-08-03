import React, { useState } from 'react';
import InputComponent from '@/atoms/common/InputComponent';
import PasswordFormComponent from './PasswordFormComponent';
import BtnBlue from '@/atoms/common/BtnBlue';
import { useNavigate } from 'react-router-dom';
import { signUpApi, verifyEmail } from '@/services/userService';
import {
  emailVaildationCheck,
  userValidationCheck,
} from '@/hooks/useValidation';

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

  const verify = async () => {
    const email = (user as userType).email;
    const check = emailVaildationCheck(email);

    if (check != 'SUCCESS') {
      alert(check);
      return 0;
    }

    const result = await verifyEmail(email);

    if (result) {
      setEmailText('사용 가능한 이메일입니다.');
      setEmailState('green');
    } else {
      setEmailText('사용 불가한 이메일입니다.');
      setEmailState('red');
    }
  };

  const signUp = () => {
    if (emailState == 'red') {
      alert('이메일 확인을 해주세요.');
      return 0;
    }
    const email = (user as userType).email;
    const pw = (user as userType).pw;
    const phone = (user as userType).phone;
    const name = (user as userType).name;
    const nickName = (user as userType).nickname;

    const validation = userValidationCheck(user as userType);
    
    if (validation != 'SUCCESS') {
      alert(validation);
      window.location.reload();
      return 0;
    }

    const numArr = phone.split('');
    let newPhone = '0';

    numArr.map((num, i) => {
      if (i == 0) return;
      if (i == 3 || i == 7) newPhone += '-';
      newPhone += num;
    });

    const formData = new FormData();

    formData.append('email', email);
    formData.append('name', name);
    formData.append('nickname', nickName);
    formData.append('password', pw);
    formData.append('phone', newPhone);
    formData.append('birthday', `${(user as userType).birth}T00:00:00.000`);

    const response = signUpApi(formData);

    response
      .then((response) => {
        if (response == 'alreadyToken') {
          alert('로그인 상태로는 회원가입을 할 수 없습니다.');
          window.location.reload();
        }
        console.log('SignUp SUCCESS');
        navigate('/');
      })
      .catch((error: string) => {
        console.log(error);
        alert(error);
        window.location.reload();
      });
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
          onClick={() => {
            verify()
              .then()
              .catch((error) => console.log(error));
          }}
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
