import { MeetingMember } from '@/types/board/type';

interface MeetingMembersProps {
  meetingMembers: MeetingMember[];
}

const RemindDetail = ({ meetingMembers }: MeetingMembersProps) => {
  return (
    <div className="flex">
      {meetingMembers.map((member) => (
        <div key={member.memberNo}>
          <h3 className="form-title">{member.name}</h3>
          <div className="flex">
            {member.polaroids.map((polaroid) => (
              <img
                className="mx-10 w-400 h-200"
                key={polaroid.no}
                src={polaroid.imageFileInfo.fileUrl}
                alt={`폴라로이드 ${polaroid.no}`}
              />
            ))}
          </div>
          {member.letter && (
            <div className="p-4 bg-white rounded-lg w-96 h-96">
              <p>{member.letter.contents}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RemindDetail;
