import React from 'react';
import SignInComponent from '../../components/organisms/SignInComponent';
import ToolTipComponent from '../../components/atoms/ToolTipComponent';

const signIn = () => {
  return (
    <div>
      <h1 className="t2b text-white m-5">S T A R G A T E</h1>
      <SignInComponent />
      <div className="text-right mt-20">
        <ToolTipComponent />
      </div>
    </div>
  );
};

export default signIn;