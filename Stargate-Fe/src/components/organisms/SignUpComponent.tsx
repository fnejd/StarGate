import React from "react";
import InputComponent from "../atoms/InputComponent";

const SignUpComponent = () => {
  return (
    <div>
      <p>회원가입</p>
      <div className="flex">
        <InputComponent
          text="이메일"
          type="email"
          notice="사용 불가한 이메일입니다."
        />
        <button className="text-12 h-2 mt-auto mb-auto">이메일 인증</button>
      </div>
    </div>
  );
};

export default SignUpComponent;
