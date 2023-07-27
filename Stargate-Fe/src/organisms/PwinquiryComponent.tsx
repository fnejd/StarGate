import React, { useState } from 'react';
import InputComponent from '../atoms/InputComponent';
import AuthNumberComponent from './AuthNumberComponent';
import BtnBlue from '@/atoms/BtnBlue';

const PwinquiryComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState<object>({ email: '' });
  const [authNum, setAuthNum] = useState<number[]>([]);

  /**
   * @RESPONSE
   * "email": 요청 보낸 이메일 주소 그대로 돌아옴
   * "code": 인증번호(6자리) 값
   */
  const verifyEmail = () => {
    // 이메일 정보 서버에 보내구!
    // 현재 SMTP 를 싸피에서 막아놔서 이메일 인증 구현 어렵다는 전망!
    // 이런!
    // const code = response.code.split("");
    const code = [3, 5, 1, 7, 6, 9];
    if (code.length > 5) {
      setAuthNum(code);
      setIsOpen(true);
    }
  };

  return (
    <div className="max-w-sm text-center m-5 ml-auto mr-auto">
      <div className="ml-auto mr-auto">
        <h1 className="form-title">비밀번호 찾기</h1>
        <InputComponent
          text="이메일"
          type="text"
          keyName="email"
          getter={email}
          setter={setEmail}
        />
        <BtnBlue text="인증번호 받기" onClick={verifyEmail} />
      </div>
      <AuthNumberComponent
        authNum={authNum}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default PwinquiryComponent;
