import PwinquiryComponent from '@/organisms/auth/PwinquiryComponent';

/**
 * @todo
 * 비밀번호 찾기에서 첫 화면(이메일 입력) 구현한 뒤
 * 이메일이 있다면 AuthNumberComponent
 * Modal로 구현
 */
const PwInquiry = () => {
  return (
    <div className="w-screen">
      <PwinquiryComponent />
    </div>
  );
};

export default PwInquiry;
