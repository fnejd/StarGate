import React, { useEffect, useState } from 'react';
import InputComponent from '@/atoms/common/InputComponent';
import PasswordFormComponent from './PasswordFormComponent';
import BtnBlue from '@/atoms/common/BtnBlue';
import { useNavigate } from 'react-router-dom';
import { logoutApi, signUpApi, verifyEmail } from '@/services/authService';
import {
  emailVaildationCheck,
  pwValidationCheck,
  userValidationCheck,
} from '@/hooks/useValidation';
import Swal from 'sweetalert2';

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
  const [pwText, setPwText] = useState('');
  const [pwState, setPwState] = useState('red');
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

  useEffect(() => {
    const pw = (user as userType).pw;
    const pwCheck = (user as userType).pwCheck;
    const result = pwValidationCheck(pw, pwCheck);
    if (result == 'SUCCESS') {
      setPwText('비밀번호가 일치합니다.');
      setPwState('green');
    } else {
      setPwText(result);
      setPwState('red');
    }
  }, [user]);

  const verify = async () => {
    const email = (user as userType).email;
    const check = emailVaildationCheck(email);

    if (check != 'SUCCESS') {
      Swal.fire('이메일 인증 실패', check, 'warning');
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
    const email = (user as userType).email;
    const pw = (user as userType).pw;
    const phone = (user as userType).phone;
    const name = (user as userType).name;
    const nickName = (user as userType).nickname;

    const validation = userValidationCheck(user as userType);
    
    if (validation != 'SUCCESS') {
      Swal.fire('입력 형식 에러', validation, 'error');
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
      .then(async (response) => {
        if (response == 'alreadyToken') {
          Swal.fire('회원가입 실패', '로그인 상태로는 회원가입을 할 수 없습니다.', 'error');
          await logoutApi();
          navigate('/');
        }
        Swal.fire('회원가입 성공', '회원가입에 성공하셨습니다.', 'success');
        navigate('/');
      })
      .catch((error: string) => {
        console.log(error);
        Swal.fire('회원가입 실패', error, 'error');
        return 0;
      });
  };

  return (
    <div className="m-5 min-w-fit mx-auto text-center">
      <p className="form-title">회원가입</p>
      <div className="flex items-center w-s">
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
          notice={pwText}
          state={pwState}
          keyName="pwCheck"
          getter={user}
          setter={setUser}
        />
      </div>
      <div className="flex">
        <InputComponent
          text="전화번호"
          placehoder="숫자만 입력해주세요."
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
      <p className='w-fit mr-auto ml-auto'>
        <BtnBlue text="회원가입" onClick={signUp} />
      </p>
    </div>
  );
};

export default SignUpComponent;
