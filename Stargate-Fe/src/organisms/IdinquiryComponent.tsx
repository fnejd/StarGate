import React, { useState } from 'react';
import InputComponent from '../atoms/InputComponent';
import BtnBlue from '@/atoms/BtnBlue';

interface userType {
  name: string;
  phone: string;
}

const IdinquiryComponent = () => {
  const [user, setUser] = useState<object>({
    name: '',
    phone: '',
  });

  const findId = () => {
    // 
    const formData = new FormData();
    formData.append('name', (user as userType).name);
    formData.append('phone', (user as userType).phone);

    console.log(formData);
  };

  return (
    <div className="max-w-sm ml-auto mr-auto text-center">
      <h1 className="form-title mb-5">아이디 찾기</h1>
      <InputComponent
        type="text"
        text="이름"
        notice="본명을 입력해주세요"
        state="red"
        keyName="name"
        getter={user}
        setter={setUser}
      />
      <InputComponent
        type="text"
        text="전화번호"
        keyName="phone"
        getter={user}
        setter={setUser}
      />
      <BtnBlue text="확인" onClick={findId} />
    </div>
  );
};

export default IdinquiryComponent;
