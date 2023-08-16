import { useState, useEffect } from 'react';

/**
 * BoardCardProps
 * @param imageSrc => 이미지 api 주소
 * @param title => Card flip시 보여줄 사인회 제목, BoardCardBox에서는 필요 X
 * @param date => Card flip시 보여줄 사인회 날짜, BoardCardBox에서는 필요 X
 * @param remainingTime => Card flip시 보여줄 남은 시간, BoardCardBox와 Remind에서는 필요 X
 */

interface BoardCardProps {
  imageSrc?: string;
  title?: string;
  date?: string;
  remainingTime?: number;
  isLoading: boolean;
}

const BoardCard = ({
  imageSrc = 'https://i.playboard.app/p/8ea962315230c3873d9666b1bc7913bb/default.jpg',
  title,
  date,
  remainingTime,
  isLoading,
}: BoardCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [stringDate, setStringDate] = useState('');

  useEffect(() => {
    if (date !== undefined) {
      const start = date;
      const [year, month, dayWithTime] = start.split('-');
      const [day, time] = dayWithTime.split('T'); // "T"를 기준으로 분리하여 일자와 시간을 추출
      const [hour, minute, second] = time.split(':');
      const newDate: Date = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute),
        Number(second.split('.')[0])
      );
      const formattedDate = `${year}-${month}-${day}  ${newDate
        .getHours()
        .toString()
        .padStart(2, '0')}:${newDate.getMinutes().toString().padStart(2, '0')}`;
      setStringDate(formattedDate);
    }
  }, [date]);

  const handleMouseEnter = () => {
    if (title && date) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <>
      {isLoading ? (
        <div
          className="lg:h-72 lg:w-72 md:h-48 md:w-48 sm:h-48 sm:w-48 relative bg-opacity-25 bg-white shadow-custom rounded-lg border border-custom backdrop-filter-blur animate-pulse"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></div>
      ) : (
        <div
          className="lg:h-72 lg:w-72 md:h-48 md:w-48 sm:h-48 sm:w-48 relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            className="lg:h-72 lg:w-72 md:h-48 md:w-48 sm:h-48 sm:w-48 object-cover object-center rounded-md"
            src={imageSrc}
            alt="card image"
          />
          {isHovering && (title || stringDate || remainingTime) && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black text-white text-center rounded-md">
              <div>
                {title && <h2 className="text-lg font-semibold">{title}</h2>}
                {stringDate && <p className="text-sm">{stringDate}</p>}
                {remainingTime && <p className="text-sm">{remainingTime}</p>}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BoardCard;
