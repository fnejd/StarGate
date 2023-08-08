import { useState } from 'react';
import InputComponent from '@/atoms/common/InputComponent';
import AuthNumberComponent from './AuthNumberComponent';
import BtnBlue from '@/atoms/common/BtnBlue';
import { pwInquiryApi } from '@/services/authService';
import { emailVaildationCheck } from '@/hooks/useValidation';
import { useSetRecoilState } from 'recoil';
import { emailState } from '@/recoil/userState';

interface emailType {
  email: string;
  code: string;
}

const PwinquiryComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState<object>({ email: '' });
  const SetEmailProp = useSetRecoilState(emailState);
  const [authNum, setAuthNum] = useState<number[]>([]);

  /**
   * @RESPONSE
   * "email": 요청 보낸 이메일 주소 그대로 돌아옴
   * "code": 인증번호(6자리) 값
   */
  const verifyEmail = () => {
    // 이메일 정보 서버에 보내구!
    const check = emailVaildationCheck((email as emailType).email);
    if (check != 'SUCCESS') {
      alert(check);
      return 0;
    }

    pwInquiryApi((email as emailType).email)
      .then((response: emailType) => {
        console.log(response);
        if (response.email == 'NoData') {
          alert('이메일 검색 결과가 없습니다.');
          window.location.reload();
          return 0;
        }
        SetEmailProp((email as emailType).email);
        const arr = response.code.split('');
        setAuthNum(arr.map((e) => parseInt(e)));
        setIsOpen(true);
      })
      .catch((error) => console.log(error));
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
        <p className='w-fit mr-auto ml-auto'>
          <BtnBlue text="인증번호 받기" onClick={verifyEmail} />
        </p>
      </div>
      <AuthNumberComponent
        email={(email as emailType).email}
        authNum={authNum}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default PwinquiryComponent;
