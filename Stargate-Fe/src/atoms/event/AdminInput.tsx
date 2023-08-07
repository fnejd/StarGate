import React, { useState } from 'react';

interface AdminInputProps {
  labelFor: string;
  type: string;
  placeholder?: string;
  min?: string;
  max?: string;
  step?: string;
  onChange?: (value: string) => void;
  onInputChange?: (value: string) => void;
  children?: React.ReactNode;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value: string | number;
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
  onBlur,
}: AdminInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onInputChange) {
      onInputChange(newValue); // onInputChange가 존재할 때에만 호출
    }
  };

  return (
    <div className="flex flex-col mr-1 w-60">
      <label htmlFor={labelFor} className="flex justify-start my-2 ml-1">
        {labelFor && (
          <span className="font-medium text-white font-suit text-14">
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
          onBlur={onBlur}
          className="w-48 h-8 px-3 py-2 ml-1 mr-1 text-black bg-white border border-gray-300 rounded-sm text-12 placeholder-pl-5 font-suit focus:outline-none focus:ring-2 focus:ring-mainblue-300 focus:border-transparent"
        />
        {children}
      </div>
    </div>
  );
};

export default AdminInput;
