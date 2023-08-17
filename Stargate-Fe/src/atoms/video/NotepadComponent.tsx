import React, { useEffect, useState, useRef } from 'react';

interface NotepadComponentProps {
  videoData?: any;
  meetingData?: any;
  initialMeetingOrder: number;
}

const NotepadComponent = ({
  videoData,
  meetingData,
  initialMeetingOrder,
}: NotepadComponentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragComponentRef = useRef<HTMLDivElement>(null);
  const [wrapWidth, setWrapWidth] = useState(200);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [current, setCurrent] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const [meetingOrder, setMeetingOrder] = useState(0); // 로컬 상태로 meetingOrder 관리

  useEffect(() => {
    // meetingOrder가 변경되면 로컬 상태인 meetingOrder 업데이트
    setMeetingOrder(initialMeetingOrder);
  }, [initialMeetingOrder]);

  // 드래그가 유효한 영역 안에서 이루어지는지 검사
  const isInsideDragArea = (e: React.DragEvent<HTMLElement>) => {
    const left = e.target instanceof HTMLElement ? e.target.offsetLeft : 0;
    const top = e.target instanceof HTMLElement ? e.target.offsetTop : 0;
    const bottom =
      e.target instanceof HTMLElement ? top + e.target.offsetHeight : top;
    const right =
      e.target instanceof HTMLElement ? left + e.target.offsetWidth : left;

    // number: offset Value, type: width인지 height 인지 구분,
    // type=true -> width, type=false -> height
    const isValid = (num: number, type: boolean) => {
      if (type) {
        if (
          (containerRef.current?.offsetWidth != undefined &&
            num >= containerRef.current?.offsetWidth) ||
          num <= 0
        )
          return false;
      } else {
        if (
          (containerRef.current?.offsetHeight != undefined &&
            num >= containerRef.current?.offsetHeight) ||
          num <= 0
        )
          return false;
      }

      return true;
    };

    if (
      isValid(left, true) &&
      isValid(top, false) &&
      isValid(bottom, false) &&
      isValid(right, true)
    )
      return true;
    return false;
  };

  // 드래그 이벤트 발생 시 호출
  const dragHandler = (e: React.DragEvent<HTMLElement>) => {
    const posTemp = { ...pos };
    posTemp['left'] =
      e.target instanceof HTMLElement
        ? e.target.offsetLeft + e.clientX - current.x
        : origin.x;
    posTemp['top'] =
      e.target instanceof HTMLElement
        ? e.target.offsetTop + e.clientY - current.y
        : origin.y;

    setPos(posTemp);

    const currentPosTemp = { ...current };
    currentPosTemp['x'] = e.clientX;
    currentPosTemp['y'] = e.clientY;

    setCurrent(currentPosTemp);
  };

  // 드래그가 시작될 때 호출
  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const blankCanvas = document.createElement('canvas');
    blankCanvas.classList.add('canvas');
    e.dataTransfer.setDragImage(blankCanvas, 0, 0);
    document.body.appendChild(blankCanvas);
    e.dataTransfer.effectAllowed = 'move';
    const originPosTemp = { ...origin };
    originPosTemp['x'] =
      e.target instanceof HTMLElement ? e.target.offsetLeft : origin.x;
    originPosTemp['y'] =
      e.target instanceof HTMLElement ? e.target.offsetTop : origin.y;
    setOrigin(originPosTemp);

    const currentPosTemp = { ...current };
    currentPosTemp['x'] = e.clientX;
    currentPosTemp['y'] = e.clientY;
    setCurrent(currentPosTemp);
  };

  // 드래그 되는 동안 호출
  const dragOverHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  // 드래그가 끝난 뒤 호출
  const dragEndHandler = (e: React.DragEvent<HTMLElement>) => {
    if (!isInsideDragArea(e)) {
      const posTemp = { ...pos };
      posTemp['left'] = origin.x;
      posTemp['top'] = origin.y;
      setPos(posTemp);
    }

    const canvases = document.getElementsByClassName('canvas');
    for (let i = 0; i < canvases.length; i++) {
      const canvas = canvases[i];
      canvas.parentNode?.removeChild(canvas);
    }
    document.body.removeAttribute('style');
  };

  return videoData ? (
    <div className="absolute z-50 w-full h-full" ref={containerRef}>
      <div
        className="relative w-fit h-fit"
        ref={dragComponentRef}
        draggable
        onDrag={(e) => dragHandler(e)}
        onDragStart={(e) => dragStartHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        style={{ left: pos.left, top: pos.top }}
      >
        {videoData.meetingMembers[meetingOrder] ? (
          <div className={`flex flex-wrap w-${(wrapWidth * 2 + 20) / 2}`}>
          <textarea
            onChange={(e) => setWrapWidth(e.target.offsetWidth)}
            className={`p-3 m-2 border-none rounded-sm outline-none resize-none w-${wrapWidth} h-200 bg-postityellow drop-shadow-lg`}
            readOnly
          >
            {videoData.meetingMembers[meetingOrder]?.postitContents}
          </textarea>
          <textarea
            onChange={(e) => setWrapWidth(e.target.offsetWidth)}
            className={`p-3 m-2 border-none rounded-sm outline-none resize-none w-${wrapWidth} h-200 bg-postityellow drop-shadow-lg`}
            readOnly
          >
            {videoData.memoContents}
          </textarea>
        </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  ) : (
    <div className="absolute w-full h-full z-50" ref={containerRef}>
      <div
        className="relative w-fit h-fit"
        ref={dragComponentRef}
        draggable
        onDrag={(e) => dragHandler(e)}
        onDragStart={(e) => dragStartHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        style={{ left: pos.left, top: pos.top }}
      >
        {meetingData && meetingData.meetingFUsers[meetingOrder] ? (
          <textarea className="p-3 m-2 border-none rounded-sm outline-none resize w-200 h-200 bg-postityellow drop-shadow-lg" readOnly >{meetingData.meetingFUsers[meetingOrder]?.postitContents}</textarea>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default NotepadComponent;
