import React, { useState } from "react";
import InputComponent from "../atoms/InputComponent";
import PWShown from "../atoms/PWShown";
import PWHidden from "../atoms/PWHidden";

/**
 * @param text => input에 전달될 text 변수
 */

interface PasswordFormProps {
  text: string;
}

const PasswordFormComponent: React.FC<PasswordFormProps> = ({ text }) => {
  const [visiable, setVisiable] = useState(false);

  return (
    visiable ? (
      <div className="flex w-full h-full">
        <InputComponent text={text} type="text" />
        <div className="flex items-center" onClick={() => setVisiable(false)}>
          <PWHidden />
        </div>
      </div>
    ) : (
      <div className="flex w-full h-full">
        <InputComponent text={text} type="password" />
        <div className="flex items-center" onClick={() => setVisiable(true)}>
          <PWShown />
        </div>
      </div>
    )
  );
};

export default PasswordFormComponent;
