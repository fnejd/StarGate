import React, { useState } from 'react';

const ToolTipComponent = () => {
  const [opacity, setOpacity] = useState(0);

  const hoverHandler = () => {
    setOpacity(100);
  }

  const mouseOutHandelr = () => {
    setOpacity(0);
  }

  return (
    <div className="relative m-2 z-10">
      {/* info */}
      <div className={`opacity-${opacity} duration-200`}>
      <span className="inline-flex items-center rounded-md bg-mainblue bg-opacity-20 p-2 text-md font-medium text-white ring-1 ring-inset ring-slate-500/10">ToolTip Add</span>
      </div>
      <a onMouseOver={() => hoverHandler()} onMouseOut={() => mouseOutHandelr()} className="relative z-20 text-b7 text-24 font-semibold hover:text-32 hover:text-b7 duration-300">
        ?
      </a>
    </div>
  );
};

export default ToolTipComponent;
