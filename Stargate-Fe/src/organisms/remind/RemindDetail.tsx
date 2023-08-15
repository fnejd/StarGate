import React, { useState } from 'react';
import { MeetingMember } from '@/types/board/type';

interface MeetingMembersProps {
  meetingMembers: MeetingMember[];
}

const RemindDetail = ({ meetingMembers }: MeetingMembersProps) => {
  return (
    <div className='flex'>
      {meetingMembers.map((member) => (
        <div key={member.memberNo}>
          <h3>{member.name}</h3>
          {member.polaroids.map((polaroid) => (
            <img
              key={polaroid.no}
              src={'polaroid.imageFileInfo'}
              alt={`폴라로이드 ${polaroid.no}`}
            />
          ))}
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
