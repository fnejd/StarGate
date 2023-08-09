import React, { useRef, MouseEvent, useEffect, useState } from 'react';
import AuthNumInputComponent from '@/atoms/auth/AuthNumInputComponent';
import BtnWhite from '@/atoms/common/BtnWhite';
import { useNavigate } from 'react-router-dom';
import { checkAuthNumApi } from '@/services/authService';
import { useSetRecoilState } from 'recoil';
import { emailState } from '@/recoil/userState';

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
    console.log(authNum);
    let check = true;
    let code = '';
    if (numArr.length < 6) {
      alert('인증번호 6자리를 입력해주세요.');
      return 0;
    }
    numArr.forEach((e, i) => {
      if (e != authNum[i]) check = false;
      code += e;
    });

    const result = checkAuthNumApi(email, code);

    if (check && result == 'SUCCESS') {
      setEmail(email);
      alert('인증되었습니다.');
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
            {load ? (
              <div className="backdrop:card shadow rounded-md p-4 mx-auto w-l">
                <p className="mt-4 mb-4 form-title text-black">
                  회원님의 이메일로 번호를 전송중입니다.
                </p>
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-slate-700 h-24 w-24 m-2"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-5 bg-slate-700 rounded m-2"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-5 bg-slate-700 rounded col-span-2 m-2"></div>
                        <div className="h-5 bg-slate-700 rounded col-span-1 m-2"></div>
                      </div>
                      <div className="h-5 bg-slate-700 rounded m-2"></div>
                    </div>
                  </div>
                </div>
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
