import React, { useState } from 'react';
import { MeetingMember } from '@/types/board/type';

/**
 * @todo => letter값이 null이여서 주석처리, 추후 확인필요
 */
interface MeetingMembersProps {
  meetingMembers: MeetingMember[];
}

const RemindDetail = ({ meetingMembers }: MeetingMembersProps) => {
  return (
    <div>
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
          {/* <div className="w-96 h-96 bg-white rounded-lg p-4">
            <p>{member.letter.contents}</p>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default RemindDetail;
