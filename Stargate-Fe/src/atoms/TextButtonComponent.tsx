import React from 'react';

/**
 * @param text => 버튼에 담길 텍스트 변수
 * @param black => 텍스트의 색을 결정하는 boolean 변수
 */

interface TextButtonProps {
  text: string;
  black?: boolean;
}

const TextButtonComponent: React.FC<TextButtonProps> = ({ text, black }) => {
  return (
    <div className={`m-2 mt-0 ${black ? 'text-black' : 'text-slate-50'} duration-100`}>
      <a>{text}</a>
    </div>
  );
};

export default TextButtonComponent;
