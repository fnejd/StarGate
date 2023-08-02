import React, { useState } from 'react';

interface AdminInputProps {
  labelFor: string;
  type: string;
  placeholder?: string;
  min?: string;
  max?: string;
  step?: string;
  onChange?: (value: string) => void;
  onInputChange: (value: string) => void;
  children?: React.ReactNode;
  value: string;
}

const AdminInput = ({
  labelFor,
  type,
  placeholder,
  min,
  max,
  step,
  onInputChange,
  children,
  value,
}: AdminInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onInputChange(newValue);
  };

  return (
    <div className="flex flex-col w-60 mr-1">
      <label htmlFor={labelFor} className="ml-1 my-2 flex justify-start">
        {labelFor && (
          <span className="font-suit font-medium text-14 text-white">
            {labelFor}
          </span>
        )}
      </label>
      <div className="flex">
        <input
          type={type}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleInputChange}
          className="w-48 h-8 text-12 ml-1 mr-1 px-3 py-2 border border-gray-300 rounded-sm bg-white text-black placeholder-pl-5 font-suit focus:outline-none focus:ring-2 focus:ring-mainblue-300 focus:border-transparent"
        />
        {children}
      </div>
    </div>
  );
};

export default AdminInput;
