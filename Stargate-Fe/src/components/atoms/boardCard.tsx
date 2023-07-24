import React, { useState } from 'react';

interface BoardCardProps {
  imageSrc: string;
  title?: string;
  date?: string;
  time?: string;
}

const BoardCard = ({ imageSrc, title, date, time }: BoardCardProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    if (title && date && time) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      className="lg:h-72 lg:w-72 md:h-48 md:w-48 sm:h-48 sm:w-48 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className="lg:h-72 lg:w-72 md:h-48 md:w-48 sm:h-48 sm:w-48 object-cover object-center"
        src={imageSrc}
        alt="card image"
      />
      {isHovering && title && date && time && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white text-center">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm">{date}</p>
            <p className="text-sm">{time}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardCard;