import React, { useState } from 'react';
import InputComponent from '../atoms/InputComponent';

const PwresetComponent = () => {
  const [pwText, setPwText] = useState('비밀번호가 일치하지 않습니다');
  const [pwState, setPwState] = useState("red");

  return (
    <div className="max-w-sm w-screen text-white p-5">
      <h1 className="m-10 form-title">비밀번호 재설정</h1>
      <div className="m-5">
        <InputComponent text="새 비밀번호" type="password" notice={null} state={null} />
        <InputComponent text="새 비밀번호 확인" type="password" notice={pwText} state={pwState} />
      </div>
      <button className="medium-white w-28 h-full rounded-lg p1b">확인</button>
    </div>
  )
}

export default PwresetComponent;
