import React from 'react';

interface PolariodCardProps {
  imageUrl?: string;
  caption?: string;
}

const PolariodCard: React.FC<PolariodCardProps> = ({ imageUrl, caption }) => {
  return (
    <div className="margin-inline-auto w-96 h-500 bg-white rounded-sm">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={caption}
          className="p-3 margin-inline-auto rounded-sm"
        />
      )}
      {caption && (
        <p className="font-suit text-center mt-2 text-black">{caption}</p>
      )}
    </div>
  );
};

export default PolariodCard;
