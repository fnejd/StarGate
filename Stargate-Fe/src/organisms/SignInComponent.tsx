import React, { useEffect, useState } from "react";
import InputComponent from "../atoms/InputComponent";
import TextButtonComponent from "../atoms/TextButtonComponent";
import BtnBlue from "@/atoms/BtnBlue";

const SignInComponent = () => {
  const [pwText, setPwText] = useState("일치하지 않는 형식입니다.");
  const [pwState, setPwState] = useState("red");
  const [user, setUser] = useState<object>({
    email: "",
    pw: "",
  });

  // 패스워드 유효성 검사 부분
  // useEffect(() => {
  //   if (user.pw.length >= 8) {
  //     setPwState("green");
  //     setPwText("올바른 비밀번호 형식입니다");
  //   }
  // }, [user]);

  /**
   * Login 결과에 따라 pwState 바꿔주면 되려나??
   * 아니면 입력할때마다 검사를 돌려줘야하려나??
   * 뭐가 나ㅡㅇ려나???
   */
  const Login = () => {
    console.log(user);
    // 로그인 요청 부분
    // if ()

    // 로그인 요청 하고 난 뒤 성공 시에
    // 로그인 유지 체크 박스 값 체크 되었는지 검사한 후 
    // 체크 되어 있으면 유지 로직 실행?
    
  };

  return (
    <div className="max-w-sm ml-auto mr-auto">
      <InputComponent
        type="text"
        text="이메일"
        keyName="email"
        getter={user}
        setter={setUser}
      />
      <InputComponent
        type="password"
        text="비밀번호"
        notice={pwText}
        state={pwState}
        keyName="pw"
        getter={user}
        setter={setUser}
      />
      <div className="flex text-white m-2 p2r">
        <input type="checkbox" className="ml-2 mr-2" />
        로그인 유지
      </div>
      <BtnBlue text="로그인" onClick={Login} />
      <div className="flex text-slate-50 p2r mt-2 w-full justify-center">
        <div className="flex">
          <TextButtonComponent text="아이디" link="/idinquiry" />
          <div className="text-slate-50 p3r">
            <p>또는</p>
          </div>
          <TextButtonComponent text="비밀번호 찾기" link="/pwinquiry" />
          &nbsp;/&nbsp;
          <TextButtonComponent text="회원가입" link="/signup" />
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
