import React from 'react';
import InputComponent from '../atoms/InputComponent';

const IdinquiryComponent = () => {
  return (
    <div className="max-w-sm w-screen ml-auto mr-auto">
      <h1 className="form-title mb-5">아이디 찾기</h1>
      <InputComponent type="text" text="이름" notice="본명을 입력해주세요" state="gray-100" />
      <InputComponent type="text" text="전화번호" notice={null} state={null} />
      <button className="medium-white p1r w-24 h-full rounded-lg">확인</button>
    </div>
  )
}

export default IdinquiryComponent;