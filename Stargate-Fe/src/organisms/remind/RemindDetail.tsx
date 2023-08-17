import React, { useState, forwardRef, ForwardedRef } from 'react';
import { MeetingMember } from '@/types/board/type';
import { sendLetterToServer } from '@/services/letterService';
import { postLetter, getEachLetter } from '@/services/userBoard';

interface MeetingMembersProps {
  meetingMembers: MeetingMember[];
  remindData: {
    uuid: string;
  };
}

const RemindDetail = forwardRef(
  (
    { meetingMembers, remindData }: MeetingMembersProps,
    ref: ForwardedRef<any>
  ) => {
    const [letterContentsMap, setLetterContentsMap] = useState({});

    console.log('편지 데이터 렌더링 관리', letterContentsMap);

    const handleSendLetter = async (member) => {
      const letterContents = letterContentsMap[member.memberNo]?.contents || '';

      const letterdata = {
        memberNo: member.memberNo,
        uuid: remindData.uuid,
        contents: letterContents,
      };

      console.log('내 편지', letterdata);

      if (letterContents.trim() !== '') {
        const postResponse = await postLetter(letterdata);
        console.log('편지 보내고 응답', postResponse);
        const letterNum = postResponse.no;

        const letter = await getEachLetter(letterNum);
        console.log('서버로 보낸 편지 도착', letter);

        setLetterContentsMap((prevContentsMap) => ({
          ...prevContentsMap,
          [member.memberNo]: {
            contents: letter.contents,
            isLetterSent: true,
          },
        }));
      }
    };

    const handleLetterContentsChange = (memberNo, contents) => {
      setLetterContentsMap((prevContentsMap) => ({
        ...prevContentsMap,
        [memberNo]: { contents: contents, isLetterSent: false },
      }));
    };

    return (
      <div className="flex" ref={ref}>
        {meetingMembers.map((member) => (
          <div key={member.memberNo}>
            <div className="flex ml-24">
              <h3 className="form-title">{member.name}</h3>
              {member.polaroids.map((polaroid) => (
                <img
                  className="mx-10 w-600 h-340"
                  key={polaroid.no}
                  src={polaroid.imageFileInfo.fileUrl}
                  alt={`폴라로이드 ${polaroid.no}`}
                />
              ))}
              <div className="relative flex flex-col p-4 bg-white rounded-lg w-96">
                <div className="flex-grow">
                  {/* 서버로부터 온 데이터가 있거나 편지가 전송된 경우는 p태그
                  아닌 경우는 작성 가능 */}
                  {member.letter !== null ||
                  letterContentsMap[member.memberNo]?.isLetterSent ? (
                    <p className="p-2">
                      {member.letter?.contents ||
                        letterContentsMap[member.memberNo].contents}
                    </p>
                  ) : (
                    <textarea
                      className="w-full p-2 border rounded-md resize-none h-5/6"
                      placeholder="편지를 작성하세요..."
                      value={letterContentsMap[member.memberNo]?.contents || ''}
                      onChange={(e) =>
                        handleLetterContentsChange(
                          member.memberNo,
                          e.target.value
                        )
                      }
                    ></textarea>
                  )}
                </div>
                <button
                  className="absolute px-4 py-2 text-white transform -translate-x-1/2 bg-blue-500 rounded bottom-2 left-1/2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  onClick={() => handleSendLetter(member)}
                  disabled={
                    member.letter !== null ||
                    letterContentsMap[member.memberNo]?.isLetterSent
                  }
                >
                  전송
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

export default RemindDetail;
