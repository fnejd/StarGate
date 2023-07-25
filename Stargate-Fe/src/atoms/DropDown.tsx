import React, {useState} from 'react';

interface DropdownProps {
    items: number[];
}
  
const DropDown: React.FC<DropdownProps> = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div>
        <button onClick={toggleDropdown}>클릭하여 드롭다운 토글</button>
        {isOpen && (
            <ul>
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
            </ul>
        )}
        </div>
    );
};

export default DropDown;