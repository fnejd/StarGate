import React from 'react';
import SignInComponent from '@/organisms/auth/SignInComponent';
import ToolTipComponent from '@/atoms/auth/ToolTipComponent';

const SignIn = () => {
  return (
    <div className="w-screen">
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
