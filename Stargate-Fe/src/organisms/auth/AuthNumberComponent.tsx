import { useRef, MouseEvent, useEffect, useState } from 'react';
import AuthNumInputComponent from '@/atoms/auth/AuthNumInputComponent';
import BtnWhite from '@/atoms/common/BtnWhite';
import { useNavigate } from 'react-router-dom';
import { checkAuthNumApi } from '@/services/authService';

interface AuthNumberProps {
  email: string;
  authNum: number[];
  isOpen: boolean;
  onClose: () => void;
}

/**
 * @param authNum => 인증번호
 * @param isOpen => 모달창 visiable 상태 불리언값
 * @param onClose() => 모달창 닫아지는 이벤트 담긴 함수
 */

const AuthNumberComponent = ({ email, authNum, isOpen, onClose }: AuthNumberProps) => {
  const [numArr, setNumArr] = useState<number[]>([]);
  const [curIdx, setCurIdx] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(curIdx);
    if (curIdx < 5) {
      document.getElementById(`NumInput_${curIdx+1}`)?.focus();
    } else {
      document.getElementsByTagName('button')[0]?.focus();
    }
  }, [numArr, curIdx]);

  const AuthNumCheck = () => {
    console.log('인증번호 유효검사');
    console.log(authNum);
    let check = true;
    let code = '';

    numArr.forEach((e, i) => {
      if (e != authNum[i]) check = false;
      code += e;
    })

    if (check && checkAuthNumApi(email, code) == 'SUCCESS') {
      /**
       * @TODO 
       * Store에 (Recoil State)
       * 해당 유저의 이메일 저장하는 상태 만들어 저장해주기. 
       * Props로 넘기는거보다 나을듯??
       */
      navigate('/pwreset');
    } else {
      alert('인증번호가 올바르지 않습니다.');
      return 0;
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div ref={modalRef} className="w-fit h-fit bg-white rounded-lg p-4">
            <div className="text-black backdrop:card bg-white p-5 rounded-lg m-5">
              <p className="mt-4 form-title text-black">인증번호 입력</p>
              <p className="mt-4 modal-title text-black">
                이메일로 전송된 인증번호 6자리를 입력해주세요
              </p>
              <div className="flex m-3">
                {authNum.map((_, i) => (
                  <AuthNumInputComponent key={i} index={i} numArr={numArr} setNumArr={setNumArr} setCurIdx={setCurIdx} />
                ))}
              </div>
              <BtnWhite text="확인" onClick={AuthNumCheck} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthNumberComponent;
