import React from 'react';
import MeetingLeftSection from '@/organisms/MeetingLeftSection.tsx';
import MeetingRightSection from '@/organisms/MeetingRightSection.tsx';
import MeetingBottomSection from '@/organisms/MeetingBottomSection.tsx';

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
