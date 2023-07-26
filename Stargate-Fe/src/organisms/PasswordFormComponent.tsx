import React, { useState } from "react";
import InputComponent from "../atoms/InputComponent";
import PWShown from "../atoms/PWShown";
import PWHidden from "../atoms/PWHidden";

/**
 * @param text => input에 전달될 text 변수
 * @param getter => 기존 유저 값
 * @param setter => Input 태그의 값 세팅
 */

interface PasswordFormProps {
  text: string;
  getter: object;
  setter: React.Dispatch<React.SetStateAction<object>>;
}

const PasswordFormComponent: React.FC<PasswordFormProps> = ({ text, getter, setter }) => {
  const [visiable, setVisiable] = useState(false);

  return (
    visiable ? (
      <div className="flex w-full h-full">
        <InputComponent text={text} type="text" keyName="pw" getter={getter} setter={setter} />
        <div className="flex items-center" onClick={() => setVisiable(false)}>
          <PWHidden />
        </div>
      </div>
    ) : (
      <div className="flex w-full h-full">
        <InputComponent text={text} type="password" keyName="pw" getter={getter} setter={setter} />
        <div className="flex items-center" onClick={() => setVisiable(true)}>
          <PWShown />
        </div>
      </div>
    )
  );
};

export default PasswordFormComponent;
