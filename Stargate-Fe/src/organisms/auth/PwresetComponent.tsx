import React, { useEffect, useState } from 'react';
import InputComponent from '@/atoms/common/InputComponent';
import BtnBlue from '@/atoms/common/BtnBlue';
import { useNavigate } from 'react-router-dom';
import { pwValidationCheck } from '@/hooks/useValidation';
import { pwResetApi } from '@/services/authService';
import Swal from 'sweetalert2';
// import { emailState } from '@/recoil/userState';
// import { useRecoilValue } from 'recoil';

interface pwCheckType {
  newPw: string;
  newPwCheck: string;
}

const PwResetComponent = () => {
  const [pwText, setPwText] = useState('비밀번호가 일치하지 않습니다.');
  const [pwState, setPwState] = useState('red');
  const [pwCheck, setPwCheck] = useState<object>({
    newPw: '',
    newPwCheck: '',
  });
  // store에서 이메일 가져오기
  // reload 되면 store 값 날라가서 이메일 정보 없어지네,,????
  // session에 저장하는것으로 바꿀게요
  const email = sessionStorage.getItem('emailStore');

  useEffect(() => {
    const newPw = (pwCheck as pwCheckType).newPw;
    const newPwCheck = (pwCheck as pwCheckType).newPwCheck;
    if (newPw != newPwCheck || newPw.length == 0) {
      setPwText('비밀번호가 일치하지 않습니다.');
      setPwState('red');
    } else {
      setPwText('비밀번호가 일치합니다.');
      setPwState('green');
    }
  }, [pwCheck]);

  const navigate = useNavigate();

  const resetPw = () => {
    // api 요청 json 형식으루
    // email, password 필요
    const pw = (pwCheck as pwCheckType).newPw;
    const pwc = (pwCheck as pwCheckType).newPwCheck;

    const validation = pwValidationCheck(pw, pwc);

    // 비밀번호가 일치하지 않는 경우
    if (validation != 'SUCCESS') {
      Swal.fire('재설정 실패', validation, 'warning');
      window.location.reload();
      return 0;
    }

    if (email == null) {
      Swal.fire('재설정 실패', '유저 이메일 정보가 없습니다.', 'error');
      navigate('/pwinquiry');
      return 0;
    }

    // 비밀번호 재설정 API 호출
    pwResetApi(email, pw)
      .then((res) => {
        if (res != '200') {
          Swal.fire('재설정 실패', '서버에 에러가 발생했습니다.', 'error');
          window.location.reload();
          return 0;
        }
        Swal.fire('재설정 성공', `${email}님 비밀번호 재설정을 완료했습니다.`, 'success');
      })
      .catch((error) => console.log(error));
    navigate('/');
  };

  return (
    <div className="max-w-sm text-white p-5 ml-auto mr-auto text-center">
      <h1 className="m-10 form-title">비밀번호 재설정</h1>
      <div className="m-5">
        <InputComponent
          text="새 비밀번호"
          type="password"
          keyName="newPw"
          getter={pwCheck}
          setter={setPwCheck}
        />
        <InputComponent
          text="새 비밀번호 확인"
          type="password"
          notice={pwText}
          state={pwState}
          keyName="newPwCheck"
          getter={pwCheck}
          setter={setPwCheck}
        />
      </div>
      <p className="w-fit mr-auto ml-auto">
        <BtnBlue text="확인" onClick={resetPw} />
      </p>
    </div>
  );
};

export default PwResetComponent;
