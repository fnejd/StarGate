import React from 'react';
import SignInComponent from '@/organisms/SignInComponent';
import ToolTipComponent from '@/atoms/ToolTipComponent';

const SignIn = () => {
  return (
    <div className="w-screen">
      <div className="ml-auto mr-auto">
        {/* 하나씩 글자 넣어보려했는데 사이즈 맞추기 힘드러요 다시 해볼게요
        <div className="flex max-w-md m-5 t2b text-white text-center">
          <h1 className="w-1/10">S</h1>
          <h1>T</h1>
          <h1>A</h1>
          <h1>R</h1>
          <h1>G</h1>
          <h1>A</h1>
          <h1>T</h1>
          <h1>E</h1>
        </div> */}
        <h1 className="t2b text-white m-5 text-center">S T A R G A T E</h1>
        <SignInComponent />
        <div className="text-right mr-20 mt-20">
          <ToolTipComponent />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
