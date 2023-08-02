import React, { useEffect, useState } from 'react';
import InputComponent from '@/atoms/common/InputComponent';
import BtnBlue from '@/atoms/common/BtnBlue';
import { useNavigate } from 'react-router-dom';
import { pwValidationCheck } from '@/hooks/useValidation';
import { pwResetApi } from '@/services/userService';

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

  /**
   * @TODO
   * 비밀번호 업데이트하는 API 요청 보내기!
   * ?? =>> 이전 모달에서 리스폰스로 받은 비번 찾기 진행중인 유저의
   * 이메일은 스토어에 넣어다니는게 나을까 아님 프로퍼티로 넘겨 받는게 나을까?
   */
  const resetPw = () => {
    console.log('비밀번호 재설정');
    // api 요청 json 형식으루
    // email, password 필요

    const pw = (pwCheck as pwCheckType).newPw;
    const pwc = (pwCheck as pwCheckType).newPwCheck;
    // store에서 이메일 가져오기
    // const email = useRecoilValue(emailState);??
    const email = 'l0u0h0@naver.com';

    const validation = pwValidationCheck(pw, pwc);

    // 비밀번호가 일치하지 않는 경우
    if (validation != 'SUCCESS') {
      alert(validation);
      window.location.reload();
      return 0;
    }

    // 비밀번호 재설정 API 호출
    pwResetApi(email, pw)
      .then((res) => {
        console.log(res);
        if (res != '200') {
          alert('서버에 문제가 발생했습니다.');
          window.location.reload();
          return 0;
        }
        alert('재설정을 완료했습니다.');
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
      <BtnBlue text="확인" onClick={resetPw} />
    </div>
  );
};

export default PwResetComponent;
