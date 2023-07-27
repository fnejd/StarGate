import React, { useEffect, useState } from 'react';

/**
 * @param min => 출력될 분
 * @param sec => 출력될 초
 */

interface TimeProps {
  min: number;
  sec: number;
}

const TimeLeftComponent: React.FC<TimeProps> = ({ min, sec }) => {
  const [time, setTime] = useState('');
  useEffect(() => {
    if (min < 10) {
      sec < 10 ? setTime(`0${min}:0${sec}`) : setTime(`0${min}:${sec}`);
    } else {
      setTime(`${min}:${sec}`);
    }
  }, [min, sec]);
  return (
    <div>
      <p className="font-semibold text-slate-50 text-48">{time}</p>
    </div>
  );
};

export default TimeLeftComponent;
