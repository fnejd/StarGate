import { MeetingMember } from '@/types/board/type';

interface MeetingMembersProps {
  meetingMembers: MeetingMember[];
}

const RemindDetail = ({ meetingMembers }: MeetingMembersProps) => {
  return (
    <div className="flex">
      {meetingMembers.map((member) => (
        <div key={member.memberNo}>
          <h3 className='form-title'>{member.name}</h3>
          <div className='flex'>
          {member.polaroids.map((polaroid) => (
            <img
              className='w-400 h-400 mx-10'
              key={polaroid.no}
              src={polaroid.imageFileInfo.fileUrl}
              alt={`폴라로이드 ${polaroid.no}`}
            />
          ))}
          </div>
          {member.letter && (
            <div className="w-96 h-96 bg-white rounded-lg p-4">
              <p>{member.letter.contents}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RemindDetail;
