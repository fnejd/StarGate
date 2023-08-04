import MeetingLeftSection from '@/organisms/event/MeetingLeftSection';
import MeetingRightSection from '@/organisms/event/MeetingRightSection';
import MeetingBottomSection from '@/organisms/event/MeetingBottomSection';

const AdminEventCreate = () => {
  return (
    <div className="flex flex-col">
      <div className="text-center form-title">이벤트 생성</div>
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
