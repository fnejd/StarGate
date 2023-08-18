import React, { useRef, MouseEvent, useEffect, useState } from 'react';
import AuthNumInputComponent from '@/atoms/auth/AuthNumInputComponent';
import BtnWhite from '@/atoms/common/BtnWhite';
import { useNavigate } from 'react-router-dom';
import { checkAuthNumApi } from '@/services/authService';
import { useSetRecoilState } from 'recoil';
import { emailState } from '@/recoil/userState';
import Swal from 'sweetalert2';

interface AuthNumberProps {
  load: boolean;
  email: string;
  authNum: number[];
  isOpen: boolean;
  onClose: () => void;
}

/**
 * @param load => 인증번호 도달 상태
 * @param email => 유저 이메일 정보
 * @param authNum => 인증번호
 * @param isOpen => 모달창 visiable 상태 불리언값
 * @param onClose() => 모달창 닫아지는 이벤트 담긴 함수
 */

const AuthNumberComponent = ({
  load,
  email,
  authNum,
  isOpen,
  onClose,
}: AuthNumberProps) => {
  const [numArr, setNumArr] = useState<number[]>([]);
  const [curIdx, setCurIdx] = useState<number>(100);
  const setEmail = useSetRecoilState(emailState);
  const navigate = useNavigate();

  useEffect(() => {
    if (curIdx < 5) {
      document.getElementById(`NumInput_${curIdx + 1}`)?.focus();
    } else if (curIdx == 100) {
      document.getElementById(`NumInput_0`)?.focus();
    } else {
      document.getElementsByTagName('button')[0]?.focus();
    }
  }, [numArr, curIdx]);

  const AuthNumCheck = () => {
    let check = true;
    let code = '';
    if (numArr.length < 6) {
      Swal.fire('입력 오류', '인증번호 6자리를 모두 입력해주세요!', 'warning');
      return 0;
    }
    numArr.forEach((e, i) => {
      if (e != authNum[i]) check = false;
      code += e;
    });

    const result = checkAuthNumApi(email, code);

    if (check && result == 'SUCCESS') {
      setEmail(email);
      Swal.fire('인증 성공', '이메일 인증이 완료되었습니다.~', 'success');
      navigate('/pwreset');
    } else {
      Swal.fire('인증 실패', '인증번호가 올바르지 않습니다.', 'error');
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
            {load ? (
              <div className="animate-pulse backdrop:card bg-white p-5 rounded-lg m-5">
                <p className="mt-4 modal-title text-slate-700">인증번호 입력</p>
                <p className="mt-4 form-title text-slate-700">
                  이메일로 전송된 인증번호 6자리를 입력해주세요
                </p>
                <div className="m-5 mx-auto bg-slate-700 rounded-lg w-m h-20 relative"></div>
                <div className="mx-auto w-40 h-16 bg-slate-700 rounded-xl"></div>
              </div>
            ) : (
              <div className="text-black backdrop:card bg-white p-5 rounded-lg m-5">
                <p className="mt-4 modal-title text-black">인증번호 입력</p>
                <p className="mt-4 form-title text-black">
                  이메일로 전송된 인증번호 6자리를 입력해주세요
                </p>
                <div className="flex m-3 justify-center">
                  {authNum.map((_, i) => (
                    <AuthNumInputComponent
                      key={i}
                      index={i}
                      numArr={numArr}
                      setNumArr={setNumArr}
                      setCurIdx={setCurIdx}
                    />
                  ))}
                </div>
                <BtnWhite text="확인" onClick={AuthNumCheck} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AuthNumberComponent;
