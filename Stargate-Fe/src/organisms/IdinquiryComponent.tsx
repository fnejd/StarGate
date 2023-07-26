import React, { useState } from 'react';
import InputComponent from '../atoms/InputComponent';
import BtnBlue from '@/atoms/BtnBlue';

const IdinquiryComponent = () => {
  const [user, setUser] = useState<object>({
    name: '',
    phone: '',
  })

  return (
    <div className="max-w-sm w-screen ml-auto mr-auto">
      <h1 className="form-title mb-5">아이디 찾기</h1>
      <InputComponent type="text" text="이름" notice="본명을 입력해주세요" state="gray-100" keyName="name" getter={user} setter={setUser} />
      <InputComponent type="text" text="전화번호" keyName="phone" getter={user} setter={setUser} />
      {/* <button className="medium-white p1r w-24 h-full rounded-lg">확인</button> */}
      <BtnBlue text="확인" onClick={() => console.log("아이디 찾기")} />
    </div>
  )
}

export default IdinquiryComponent;