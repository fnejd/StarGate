import React from "react";
import AuthNumInputComponent from "../atoms/AuthNumInputComponent";

const AuthNumberComponent = () => {
  return (
    <div className="text-black backdrop:card bg-white p-5 rounded-lg m-5">
      <p className="mt-4 form-title text-black">인증번호 입력</p>
      <p className="mt-4 modal-title text-black">이메일로 전송된 인증번호 6자리를 입력해주세요</p>
      <div className="flex m-3">
        <AuthNumInputComponent num={3} />
        <AuthNumInputComponent num={6} />
        <AuthNumInputComponent num={4} />
        <AuthNumInputComponent num={8} />
        <AuthNumInputComponent num={1} />
        <AuthNumInputComponent num={5} />
      </div>
      <button className="medium-blue">확인</button>
    </div>
  );
}

export default AuthNumberComponent;