import React, { useEffect, useState } from 'react';
import InputComponent from '@/atoms/common/InputComponent';
import TextButtonComponent from '@/atoms/common/TextButtonComponent';
import BtnBlue from '@/atoms/common/BtnBlue';
import { adminLoginApi, loginApi } from '@/services/authService';
import { useNavigate } from 'react-router-dom';
import ToggleButtonComponent from '@/atoms/auth/ToggleButtonComponent';
import Swal from 'sweetalert2';

interface userType {
  type: string;
  email: string;
  pw: string;
}

const SignInComponent = () => {
  const navigate = useNavigate();

  const [pwText, setPwText] = useState('');
  const [pwState, setPwState] = useState('red');
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState<object>({
    type: '',
    email: '',
    pw: '',
  });

  // 패스워드 유효성 검사 부분
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/board');
    }

    // Password Checking
    const password = (user as userType).pw;
    const regexPw = new RegExp(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
    );
    if (password.length >= 8 && regexPw.test(password)) {
      setPwState('green');
      setPwText('올바른 비밀번호 형식입니다.');
    } else {
      setPwState('red');
      setPwText('올바르지 않은 형식입니다.');
    }
  }, [user]);

  const Login = () => {
    // 로그인 요청 부분
    // User 객체 FormData로 변환
    const formData = new FormData();

    formData.append('email', (user as userType).email);
    formData.append('password', (user as userType).pw);

    if (pwState == 'red') {
      Swal.fire('로그인 실패', '올바르지 않은 비밀번호 입니다.', 'warning');
      return;
    }

    // 로그인 요청 하고 난 뒤 성공 시에
    // 로그인 유지 체크 박스 값 체크 되었는지 검사한 후
    // 체크 되어 있으면 로컬 스토리지에 토큰 저장해주기
    if ((user as userType).type == 'on') {
      adminLoginApi(formData, checked)
        .then((res) => {
          if (res == 'alreadyToken') {
            Swal.fire('로그인 실패', '이미 로그인 된 상태입니다.', 'warning');
            navigate('/');
          } else if (res == 'SUCCESS') {
            Swal.fire('로그인 성공!', '로그인에 성공하셨습니다.', 'success');
            navigate('/admin/board');
          } else {
            Swal.fire('로그인 실패', '관리자 로그인 실패', 'error');
          }
        })
        .catch((error) =>
          Swal.fire('로그인 실패', '관리자 로그인 실패', 'error')
        );
    } else {
      loginApi(formData, checked)
        .then((res) => {
          if (res == 'alreadyToken') {
            Swal.fire('로그인 실패', '이미 로그인 된 상태입니다.', 'warning');
            navigate('/');
          } else if (res == 'SUCCESS') {
            Swal.fire('로그인 성공!', '로그인에 성공하셨습니다.', 'success');
            navigate('/board');
          } else {
            if (res === '팬 로그인 실패') {
              Swal.fire(
                '로그인 실패',
                '비밀번호를 다시 확인해주십시오.',
                'error'
              );
            } else {
              Swal.fire('로그인 실패', res, 'error');
            }
          }
        })
        .catch((error) => {
          Swal.fire('로그인 실패', '팬 로그인 실패', 'error');
        });
    }
  };

  return (
    <div className="max-w-sm mt-20 ml-auto mr-auto items-center">
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
      <div className="flex text-white m-5 p2r">
        <div className="w-1/2">
          <input
            type="checkbox"
            id="loginStatus"
            checked={checked}
            onChange={() => setChecked(!checked)}
            className="ml-2 mr-2"
          />
          로그인 유지
        </div>
        <div className="flex w-1/2">
          <ToggleButtonComponent getter={user} setter={setUser} />
          <p className="ml-2">관리자 로그인</p>
        </div>
      </div>
      <div className="flex justify-center m-5">
        <BtnBlue text="로그인" onClick={Login} />
      </div>
      <div className="flex text-white p2r mt-2 w-full justify-center">
        <div className="flex">
          <TextButtonComponent text="아이디" link="/idinquiry" />
          <div className="text-white p3r">
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
