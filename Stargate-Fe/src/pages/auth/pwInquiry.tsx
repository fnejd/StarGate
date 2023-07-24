import React from 'react';
import AuthNumberComponent from '../../components/organisms/AuthNumberComponent';
import PwinquiryComponent from '../../components/organisms/PwinquiryComponent';

/**
 * @todo
 * 비밀번호 찾기에서 첫 화면(이메일 입력) 구현한 뒤
 * 이메일이 있다면 AuthNumberComponent render
 */
const Pwinquiry = () => {
  return (
    <div>
      <PwinquiryComponent />
    </div>
  );
};

export default Pwinquiry;