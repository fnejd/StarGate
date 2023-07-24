import React from "react";

interface TextButtonProps {
  text: string;
}

const TextButtonComponent: React.FC<TextButtonProps> = ({ text }) => {
  return (
    <div className="ml-2 mr-2 mb-2">
      <a className="text-slate-50 text-12 font-semibold">{text}</a>
    </div>
  );
};

export default TextButtonComponent;
