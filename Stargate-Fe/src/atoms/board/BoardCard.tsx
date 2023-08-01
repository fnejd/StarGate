import React, { useState } from 'react';

/**
 * BoardCardProps
 * @param imageSrc => 이미지 api 주소
 * @param title => Card flip시 보여줄 사인회 제목, BoardCardBox에서는 필요 X
 * @param date => Card flip시 보여줄 사인회 날짜, BoardCardBox에서는 필요 X
 * @param time => Card flip시 보여줄 남은 시간, BoardCardBox와 Remind에서는 필요 X
 */

interface BoardCardProps {
  imageSrc: string;
  title?: string;
  date?: string;
  time?: string;
}

const BoardCard = ({ imageSrc, title, date, time }: BoardCardProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    if (title && date) {
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
      {isHovering && (title || date || time) && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black text-white text-center">
          <div>
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {date && <p className="text-sm">{date}</p>}
            {time && <p className="text-sm">{time}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardCard;
