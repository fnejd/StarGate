import React from 'react';
import SignInComponent from '@/organisms/SignInComponent';
import ToolTipComponent from '@/atoms/ToolTipComponent';

const SignIn = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };
  const imageUrl = 'https://picsum.photos/900/700';
  const caption = '사진 캡션';
  const label = '라벨'

  return (
    // 임시
    <div className='bg-slate-700'>
      {/* <MeetingLeftSection /> */}
      {/* <MeetingRightSection /> */}
      <MeetingBottomSection />
      {/* <BtnWhite text="Click me" onClick={handleClick} />
      <BtnBlue text="Click me" onClick={handleClick} />
      <PolariodCard imageUrl={imageUrl} caption={caption} />
      <AdminBtn text="Click me" onClick={handleClick} />
      <AdminInput labelFor="이름" type="text" placeholder="Enter your name" />
      <BlackLayer /> */}
    </div>
  );
};

export default SignIn;
