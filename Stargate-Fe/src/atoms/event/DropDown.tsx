import React, { useState } from 'react';

interface DropdownProps {
  options: (string | number)[];
  onOptionChange: (value: number | string) => void;
  disabled?: boolean;
}

const DropDown: React.FC<DropdownProps> = ({
  options,
  onOptionChange,
  disabled,
}) => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [cutCount, setCutCount] = useState<number>(4);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number.isNaN(Number(event.target.value)) ? event.target.value : Number(event.target.value);
    console.log('옵션선택%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', selectedValue)
    // setSelectedValue(selectedValue);
    onOptionChange(selectedValue);
  };

  return (
    <>
      <div className="flex items-end">
        <select
          name="options"
          id="options"
          className="w-48 h-8 px-3 py-2 mx-1 my-1 text-black bg-white border border-gray-300 rounded-sm text-12 placeholder-pl-5 font-suit focus:outline-none focus:ring-2 focus:ring-mainblue-300 focus:border-transparent"
          onChange={handleOptionChange}
          disabled={disabled}
        >
          {options.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default DropDown;
