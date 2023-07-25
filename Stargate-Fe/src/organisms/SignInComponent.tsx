import React, { useState } from "react";
import InputComponent from "../atoms/InputComponent";
import TextButtonComponent from "../atoms/TextButtonComponent";

const SignInComponent = () => {
  const [pwState, setPwState] = useState('red');

  /**
   * Login 결과에 따라 pwState 바꿔주면 되려나??
   * 아니면 입력할때마다 검사를 돌려줘야하려나??
   * 뭐가 나ㅡㅇ려나???
   */

  return (
    <div className="max-w-sm ml-auto mr-auto">
      <InputComponent type="text" text="이메일" />
      <InputComponent
        type="password"
        text="비밀번호"
        notice="일치하지 않는 형식입니다."
        state={pwState}
      />
      <div className="flex text-white m-2 p2r">
        <input type="checkbox" className="ml-2 mr-2" />
        로그인 유지
      </div>
      <button className="medium-white p2b w-32 h-full rounded-lg mt-5">
        로그인 버튼
      </button>
      <div className="flex text-slate-50 p2r mt-2 w-full justify-center">
        <div className="flex">
          <TextButtonComponent text="아이디" />
          <div className="text-slate-50 p3r">
            <p>또는</p>
          </div>
          <TextButtonComponent text="비밀번호 찾기" />
          &nbsp;/&nbsp;
          <TextButtonComponent text="회원가입" />
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
