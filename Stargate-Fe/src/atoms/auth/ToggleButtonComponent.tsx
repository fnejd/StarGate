import React from 'react';

interface ToggleProps {
  getter: object;
  setter: React.Dispatch<React.SetStateAction<object>>;
}

const ToggleButtonComponent: React.FC<ToggleProps> = ({ getter, setter }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setter({
      ...getter,
      ['type']: value,
    });
  };

  return (
    <>
      <label
        htmlFor="check"
        className="bg-gray-100 relative w-11 h-5 rounded-full"
      >
        <input type="checkbox" id="check" onChange={e => onChange(e)} className="sr-only peer" />
        <span className="w-2/5 h-4/5 bg-b4 absolute rounded-full left-1 top-0.5 peer-checked:bg-mainblue peer-checked:left-6 transition-all duration-300"></span>
      </label>
    </>
  );
};

export default ToggleButtonComponent;
