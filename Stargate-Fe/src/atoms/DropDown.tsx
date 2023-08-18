// import React, { useState } from 'react';

// interface DropdownProps {
//   numbers: number[];
//   onOptionChange: (value: number) => void;
// }

// const DropDown: React.FC<DropdownProps> = ({ numbers, onOptionChange }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [cutCount, setCutCount] = useState<number>(4);

//   const toggleDropdown = () => {
//     setIsOpen((prev) => !prev);
//   };

//   const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedValue = Number(event.target.value);
//     onOptionChange(selectedValue);
//   };

//   return (
//     <>
//       <div className="flex items-end">
//         <select
//           name="picCount"
//           id="picCount"
//           className="w-48 h-8 px-3 py-2 mx-1 my-1 text-black bg-white border border-gray-300 rounded-sm text-12 placeholder-pl-5 font-suit focus:outline-none focus:ring-2 focus:ring-mainblue-300 focus:border-transparent"
//           onChange={handleOptionChange}
//         >
//           {numbers.map((item, index) => (
//             <option key={index} value={item}>
//               {item}
//             </option>
//           ))}
//         </select>
//       </div>
//     </>
//   );
// };

// export default DropDown;
