import React from 'react';

/**
 * AuthNumInputComponent
 * @param num => 인증번호 값!
 */
interface AuthNumInputProps {
  num: number;
}

const AuthNumInputComponent: React.FC<AuthNumInputProps> = ({ num }) => {
  return (
    <div className="m-1.5 border-2 border-blue-600 rounded-lg w-14 h-20">
      <p className="block text-black text-48 mt-auto mb-auto">{num}</p>
    </div>
  );
};

export default AuthNumInputComponent;
