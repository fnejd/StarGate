import React from "react";
import SignInComponent from "@/organisms/SignInComponent";
import ToolTipComponent from "@/atoms/ToolTipComponent";

const SignIn = () => {
  return (
    <div className="w-screen">
      <div className="ml-auto mr-auto">
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
