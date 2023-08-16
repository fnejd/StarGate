import React from 'react';
import SignInComponent from '@/organisms/auth/SignInComponent';
import ToolTipComponent from '@/atoms/auth/ToolTipComponent';
import NotepadComponent from '@/atoms/video/NotepadComponent';

/**
 * @todo
 * Toggle 버튼 하나 만들어서 로그인 API 요청할 때
 * 관리자 로그인인지 유저 로그인인지 구분 가능토록
 */
const SignIn = () => {
  return (
    <div className="w-screen">
      <NotepadComponent initialMeetingOrder={0} meetingData={null} />
      <div className="ml-auto mr-auto text-center">
        <h1 className="m-5 text-center text-white t2b">S T A R G A T E</h1>
        <SignInComponent />
        <div className="absolute w-fit right-10 bottom-10">
          <ToolTipComponent />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
