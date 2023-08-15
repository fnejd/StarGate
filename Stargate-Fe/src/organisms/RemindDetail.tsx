import React, { useState } from 'react';

interface Polaroid {
  no: number;
  url: string;
}

interface Letter {
  no: number;
  contents: string;
}

interface MeetingMember {
  no: number;
  name: string;
  letter: Letter;
  polaroids: Polaroid[];
}

interface MeetingMembersProps {
  meetingMembers: MeetingMember[];
}

const RemindDetail = ({ meetingMembers }: MeetingMembersProps) => {
  return (
    <div>
      {meetingMembers.map((member) => (
        <div key={member.no}>
          <h3>{member.name}</h3>
          {member.polaroids.map((polaroid) => (
            <img
              key={polaroid.no}
              src={polaroid.url}
              alt={`폴라로이드 ${polaroid.no}`}
            />
          ))}
          <div className="w-96 h-96 bg-white rounded-lg p-4">
            <p>{member.letter.contents}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RemindDetail;
