import React from 'react';
import NewJeans from '../../assets/image/NEWJEANS.jpg'

export interface BoardCardProps {
  imageSrc: string;
  title: string;
  date: string;
  time: string;
}

const BoardCard = () => {
  return (
    <div className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-y-hidden">
      <img
        className="lg:h-80 md:h-48 sm:h-48 w-full object-cover object-center"
        src={NewJeans}
        alt='card image'
      />
    </div>
  );
};

export default BoardCard;