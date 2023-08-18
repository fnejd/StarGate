/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';

/**
 * InputComponent
 * @param type => 인풋 태그 타입 설정 변수
 * @param text => 라벨과 플레이스 홀더에 들어갈 인풋 이름 변수
 * @param notice => 있다면 하단에 띄울 공지? 경고 문구
 * @param state => 경고 문구의 상태 값, (색상 값을 전달 ex: green, red)
 * @param keyName => 유저 객체에 저장할 키 네임
 * @param getter => 기존 유저 값
 * @param setter() => 인풋 태그의 값 세팅할 setter
 * @param value => 마이페이지에서 기본적으로 들어가 있을 값
 */

interface InputProps {
  type: string;
  text: string;
  notice?: string;
  state?: string;
  keyName?: string;
  getter?: object;
  setter: React.Dispatch<React.SetStateAction<object>>;
  value?: string;
  placehoder?: string;
  disabled?: boolean;
}

const InputComponent: React.FC<InputProps> = ({
  type,
  text,
  notice,
  state,
  keyName,
  getter,
  setter,
  value,
  placehoder,
  disabled,
}) => {
  // state 값 class 지정 분기
  if (state == 'red') {
    state = 'input-warning';
  } else if (state != undefined) {
    state = `font-suit text-12 font-medium text-green`;
  }

  // Input onChange 시 setter 호출해 state 값 변경해주기
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setter({
      ...getter,
      [name]: value,
    });
  };

  return (
    <div className="p-1 m-2 w-full text-start">
      <p className="h4r text-white text-left">{text}</p>
      {type == 'password' ? (
        <div>
          <input
            name={keyName}
            onChange={(e) => onChange(e)}
            className="min-w-full text-white bg-transparent border-b-2 border-slate-50 mt-2 placeholder:text-slate-50"
            type={type}
            placeholder={placehoder != undefined ? placehoder : text}
            value={value}
            disabled={disabled ? true : false}
          />
        </div>
      ) : (
        <div>
          <input
            name={keyName}
            onChange={(e) => onChange(e)}
            className="min-w-full text-white bg-transparent border-b-2 border-slate-50 mt-2 placeholder:text-slate-50"
            type={type}
            placeholder={placehoder != undefined ? placehoder : text}
            value={value}
            disabled={disabled ? true : false}
          />
        </div>
      )}
      <p className={`mt-1.5 ${state} block h-4`}>{notice}</p>
    </div>
  );
};

export default InputComponent;
