import React, { useState } from 'react';
import InputComponent from '@/atoms/common/InputComponent';
import BtnBlue from '@/atoms/common/BtnBlue';
import { idInquiryApi } from '@/services/authService';
import IdResultModal from './IdResultModal';

interface userType {
  name: string;
  phone: string;
}

const IdinquiryComponent = () => {
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<object>({
    name: '',
    phone: '',
  });

  // USER ID 찾기 메서드
  const findId = () => {
    // 폼데이터로 변환
    const formData = new FormData();
    const phone = (user as userType).phone;
    const numArr = phone.split('');
    let newPhone = '0';
    numArr.map((num, i) => {
      if (i == 0) return;
      if (i == 3 || i == 7) newPhone += '-';
      newPhone += num;
    });
    formData.append('name', (user as userType).name);
    formData.append('phone', newPhone);

    idInquiryApi(formData)
      .then((res) => {
        if (res.email.length > 0 || res.email != 'NoData') {
          setEmail(res.email);
        } else {
          setEmail('등록된 이메일 정보를 찾지 못했습니다.');
        }
        setIsOpen(true);
      })
      .catch((error) => console.log(error));
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
      <p className="w-fit mr-auto ml-auto">
        <BtnBlue text="확인" onClick={findId} />
      </p>
      <IdResultModal
        email={email}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default IdinquiryComponent;
