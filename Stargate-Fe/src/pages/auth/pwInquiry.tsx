import React from 'react';
import AuthNumberComponent from '@/organisms/AuthNumberComponent';
import PwinquiryComponent from '@/organisms/PwinquiryComponent';

/**
 * @todo
 * 비밀번호 찾기에서 첫 화면(이메일 입력) 구현한 뒤
 * 이메일이 있다면 AuthNumberComponent render
 */
const PwInquiry = () => {
  return (
    <div>
      <PwinquiryComponent />
    </div>
  );
};

export default PwInquiry;