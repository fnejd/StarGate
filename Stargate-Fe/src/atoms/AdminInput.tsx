import React from 'react';

interface AdminInputProps {
  labelFor: string;
  type: string;
  placeholder?: string;
  min?: string;
  max?: string;
  step?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const AdminInput: React.FC<AdminInputProps> = ({ labelFor, type, placeholder, min, max, step, onChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={labelFor} className="ml-1 mt-2 mb-2"> 
        {labelFor && <span className="font-suit font-medium text-14 text-white">{labelFor}</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        className="w-48 h-8 text-12 px-3 py-2 border border-gray-300 rounded-sm bg-white text-black placeholder-pl-5 font-suit focus:outline-none focus:ring-2 focus:ring-mainblue-300 focus:border-transparent"
      />
      <p></p>
    </div>
  );
};

export default AdminInput;