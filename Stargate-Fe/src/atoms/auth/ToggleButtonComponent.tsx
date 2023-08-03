import React from 'react';

interface ToggleProps {
  getter: object;
  setter: React.Dispatch<React.SetStateAction<object>>;
}

// 렌더링 관계없이 토글의 이전 상태값 저장위해 전역으로,,!
let prevValue = '';

const ToggleButtonComponent: React.FC<ToggleProps> = ({ getter, setter }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    if (prevValue == value) {
      value = value == '' ? 'on' : '';
    }
    setter({
      ...getter,
      ['type']: value,
    });
    prevValue = value;
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
