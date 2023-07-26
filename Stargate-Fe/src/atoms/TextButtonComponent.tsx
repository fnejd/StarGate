import React from "react";

/**
 * @param text => 버튼에 담길 텍스트 변수
 * @param link => 버튼에 담길 링크 주소
 */

interface TextButtonProps {
  text: string;
  link?: string;
}

const TextButtonComponent: React.FC<TextButtonProps> = ({ text, link }) => {
  return (
    <div className="m-2 mt-0">
      <a className="text-slate-50 duration-100" href={link}>{text}</a>
    </div>
  );
};

export default TextButtonComponent;
