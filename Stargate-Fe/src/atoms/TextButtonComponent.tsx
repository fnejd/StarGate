import React from 'react';

/**
 * @param text => 버튼에 담길 텍스트 변수
 * @param black => 텍스트의 색을 결정하는 boolean 변수
 * @param link => 버튼에 담길 링크 주소
 */

interface TextButtonProps {
  text: string;
  black?: boolean;
  link?: string;
}

const TextButtonComponent: React.FC<TextButtonProps> = ({
  text,
  black,
  link,
}) => {
  return (
    <div
      className={`m-2 mt-0 ${
        black ? 'text-black' : 'text-white'
      } duration-100`}
    >
      <a className="text-white duration-100" href={link}>
        {text}
      </a>
    </div>
  );
};

export default TextButtonComponent;
