import React from 'react';

/**
 * AuthNumInputComponent
 * @param num => 인증번호 값!
 */
interface AuthNumInputProps {
  index: number;
  numArr: number[];
  setNumArr: React.Dispatch<React.SetStateAction<number[]>>;
  setCurIdx: React.Dispatch<React.SetStateAction<number>>;
}

const AuthNumInputComponent: React.FC<AuthNumInputProps> = ({
  index,
  numArr,
  setNumArr,
  setCurIdx,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newArr = [...numArr];
    newArr[index] = parseInt(value);
    setNumArr(newArr);
    setCurIdx(index);
  };

  return (
    <div className="m-1.5 border-2 border-blue-600 rounded-lg w-14 h-20 relative content-center">
      <input
        id={`NumInput_${index}`}
        maxLength={1}
        type="text"
        onChange={(e) => onChange(e)}
        className="text-center block text-black text-48 m-auto mt-1 w-10 h-16 outline-none"
      ></input>
    </div>
  );
};

export default AuthNumInputComponent;
