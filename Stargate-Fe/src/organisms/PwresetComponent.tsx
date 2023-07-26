import React, { useState } from "react";
import InputComponent from "../atoms/InputComponent";
import BtnBlue from "@/atoms/BtnBlue";
import { useNavigate } from "react-router-dom";

const PwResetComponent = () => {
  const [pwText, setPwText] = useState("비밀번호가 일치하지 않습니다");
  const [pwState, setPwState] = useState("red");
  const [pwCheck, setPwCheck] = useState<object>({
    newPw: "",
    newPwCheck: "",
  });

  // useEffect 써서 newPw 바뀔때마다
  // 비빌먼호 일치 여부 체크 해줘도 괜찮을까?

  const navigate = useNavigate();

  const resetPw = () => {
    console.log("비밀번호 재설정");
    navigate("/");
  };

  return (
    <div className="max-w-sm w-screen text-white p-5">
      <h1 className="m-10 form-title">비밀번호 재설정</h1>
      <div className="m-5">
        <InputComponent
          text="새 비밀번호"
          type="password"
          keyName="newPw"
          getter={pwCheck}
          setter={setPwCheck}
        />
        <InputComponent
          text="새 비밀번호 확인"
          type="password"
          notice={pwText}
          state={pwState}
          keyName="newPwCheck"
          getter={pwCheck}
          setter={setPwCheck}
        />
      </div>
      <BtnBlue text="확인" onClick={resetPw} />
    </div>
  );
};

export default PwResetComponent;
