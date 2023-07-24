import React from "react";
import InputComponent from "../atoms/InputComponent";
import TextButtonComponent from "../atoms/TextButtonComponent";

const SignInComponent = () => {
  return (
    <div className="bg-slate-400 min-w-full">
      <InputComponent type="text" text="이메일" notice={null} />
      <InputComponent
        type="password"
        text="비밀번호"
        notice="일치하지 않는 형식입니다."
      />
      <div className="flex text-slate-50 m-2 text-xs">
        <input type="checkbox" className="ml-2 mr-2" />
        로그인 유지
      </div>
      <button className="ml-auto mr-auto text-b7 text-xs m-2">
        로그인 버튼(예정)
      </button>
      <div className="flex text-slate-50 text-12 mt-2">
        <TextButtonComponent text="아이디 또는 비밀번호 찾기" />
        &nbsp;/&nbsp;
        <TextButtonComponent text="회원가입" />
      </div>
    </div>
  );
};

export default SignInComponent;
