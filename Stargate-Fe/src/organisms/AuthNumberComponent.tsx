import React, { useRef, MouseEvent } from 'react';
import AuthNumInputComponent from '../atoms/AuthNumInputComponent';
import BtnWhite from '@/atoms/BtnWhite';
import { useNavigate } from 'react-router-dom';

interface AuthNumberProps {
  authNum: number[];
  isOpen: boolean;
  onClose: () => void;
}

/**
 * @param authNum => 인증번호
 * @param isOpen => 모달창 visiable 상태 불리언값
 * @param onClose() => 모달창 닫아지는 이벤트 담긴 함수
 */

const AuthNumberComponent = ({ authNum, isOpen, onClose }: AuthNumberProps) => {
  const navigate = useNavigate();

  const AuthNumCheck = () => {
    console.log('인증번호 유효검사');
    // 인증번호가 유저에겐 못넘어간다네요!
    navigate('/pwreset');
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
                {authNum.map((num, i) => (
                  <AuthNumInputComponent key={i} num={num} />
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
