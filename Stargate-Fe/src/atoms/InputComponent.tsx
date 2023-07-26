/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';

/**
 * InputComponent
 * @param type => 인풋 태그 타입 설정 변수
 * @param text => 라벨과 플레이스 홀더에 들어갈 인풋 이름 변수
 * @param notice => 있다면 하단에 띄울 공지? 경고 문구
 * @param state => 경고 문구의 상태 값, (색상 값을 전달 ex: green, red)
 * @param value => 마이페이지에서 기본적으로 들어가 있을 값
 */

interface InputProps {
  type: string;
  text: string;
  notice?: string;
  state?: string;
  value?: string;
}

const InputComponent: React.FC<InputProps> = ({
  type,
  text,
  notice,
  state,
  value,
}) => {
  if (state == 'red') {
    state = 'input-warning';
  } else {
    state = `font-suit text-16 font-medium text-${state}`;
  }

  return (
    <div className='p-1 m-2 w-full text-start'>
      <p className='h4r text-white text-left'>{text}</p>
      {type == 'password' ? (
        <div>
          <input
            className='min-w-full text-slate-50 bg-transparent border-b-2 border-slate-50 mt-2 placeholder:text-slate-50'
            type={type}
            placeholder={text}
            value={value}
          />
        </div>
      ) : (
        <div>
          <input
            className='min-w-full text-slate-50 bg-transparent border-b-2 border-slate-50 mt-2 placeholder:text-slate-50'
            type={type}
            placeholder={text}
            value={value}
          />
        </div>
      )}

      {notice != null ? (
        <p className={`mt-1 ${state}`}>{notice}</p>
      ) : (
        <p className='ml-3 mt-3'></p>
      )}
    </div>
  );
};

export default InputComponent;
