import React from "react";

interface TextButtonProps {
  text: string;
}

const TextButtonComponent: React.FC<TextButtonProps> = ({ text }) => {
  return (
    <div className="m-2">
      <a className="text-slate-50 text-14 font-semibold">{text}</a>
    </div>
  );
};

export default TextButtonComponent;
