import React from 'react'; 

const AdminEventCreate = () => {
  return (
    <div className="flex flex-col">
      <div className="form-title text-center">이벤트 생성</div>
      <div>
        <MeetingLeftSection />
        <MeetingRightSection />
      </div>
      <div>
        <MeetingBottomSection />
      </div>
    </div>
  );
};

export default AdminEventCreate;
