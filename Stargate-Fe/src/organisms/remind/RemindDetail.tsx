import { MeetingMember } from '@/types/board/type';

interface MeetingMembersProps {
  meetingMembers: MeetingMember[];
}

const RemindDetail = ({ meetingMembers }: MeetingMembersProps) => {
  return (
    <div className="flex">
      {meetingMembers.map((member) => (
        <div key={member.memberNo}>
          <div className="flex">
            <h3 className="ml-10 form-title">{member.name}</h3>
            {member.polaroids.map((polaroid) => (
              <img
                className="mx-10 w-400 h-400"
                key={polaroid.no}
                src={polaroid.imageFileInfo.fileUrl}
                alt={`폴라로이드 ${polaroid.no}`}
              />
            ))}
            {member.letter && (
              <div className="p-4 bg-white rounded-lg w-96 h-96">
                <p>{member.letter.contents}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RemindDetail;
