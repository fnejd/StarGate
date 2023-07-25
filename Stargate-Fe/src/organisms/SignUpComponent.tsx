import React, { useState } from "react";
import InputComponent from "../atoms/InputComponent";
import PasswordFormComponent from "./PasswordFormComponent";

const SignUpComponent = () => {
  const [emailState, setEmailState] = useState('red');

  /**
   * 이메일 인증 결과를 이용해 emailState 값을 변경시켜
   * Input 컴포넌트에 프로퍼티로 전달해주기
   * 이메일 값을 함수 매개변수로 가져가야하려나
   * 그냥 인풋 태그 자체에서 가져가야 하려나
   * 따로 컴포넌트로 빼둔거라 함수 매개변수로 가져가는게 나으려나?
   */
  const verify = () => {
    console.log("api 요청");
  };

  return (
    <div className="m-5">
      <p className="form-title">회원가입</p>
      <div className="flex items-center">
        <InputComponent
          text="이메일"
          type="email"
          notice="사용 불가한 이메일입니다."
          state={emailState}
        />
        <button className="medium-white p3r w-full h-10 rounded-lg" onClick={verify}>이메일 확인</button>
      </div>
      <div className="flex">
        <InputComponent text="이름" type="text" />
      </div>
      <div className="flex">
        <InputComponent text="닉네임" type="text" />
      </div>
      <div className="flex">
        <PasswordFormComponent text="비밀번호" />
      </div>
      <div className="flex">
        <InputComponent text="비밀번호 확인" type="password" />
      </div>
      <div className="flex">
        <InputComponent text="전화번호" type="text" />
      </div>
      <div className="flex">
        <InputComponent text="생년월일" type="text" />
      </div>
      <button className="medium-white">회원가입</button>
    </div>
  );
};

export default SignUpComponent;
