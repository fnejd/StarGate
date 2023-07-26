import React, { useRef, MouseEvent } from "react";
import AuthNumInputComponent from "../atoms/AuthNumInputComponent";
import BtnWhite from "@/atoms/BtnWhite";
import { useNavigate } from "react-router-dom";

interface ModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * TODO:
 * 인증번호 값 어떻게 넘겨 받을 것인지와
 * 넘겨받은 인증번호 값으로 유효 검사 요청 날려주기
 */

const AuthNumberComponent = ({ isOpen, onClose }: ModalBoxProps) => {
  const navigate = useNavigate();

  const AuthNumCheck = () => {
    console.log("인증번호 유효검사");
    navigate("/pwreset");
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
                <AuthNumInputComponent num={3} />
                <AuthNumInputComponent num={6} />
                <AuthNumInputComponent num={4} />
                <AuthNumInputComponent num={8} />
                <AuthNumInputComponent num={1} />
                <AuthNumInputComponent num={5} />
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

const ModalBox = ({ isOpen, onClose }: ModalBoxProps) => {
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
          <div
            ref={modalRef}
            className="w-96 h-96 bg-white rounded-lg p-4"
          ></div>
        </div>
      )}
    </>
  );
};
