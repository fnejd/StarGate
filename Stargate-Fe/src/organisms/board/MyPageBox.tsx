import React, { useEffect, useState } from 'react';
import InputComponent from '../../atoms/common/InputComponent';
import PasswordFormComponent from '../auth/PasswordFormComponent';
import TextButtonComponent from '@/atoms/common/TextButtonComponent';

/**
 * Todos
 * InputComponents 충돌 수정
 */

/**
 * MyPageBoxProps
 * @param isAdmin => admin 여부가 들어갈 boolean 변수, 값에 따라 다른 항목이 랜더링 됨
 */

interface MyPageBoxProps {
  isAdmin: boolean;
  email: string;
  name?: string;
  nickname?: string;
  phone?: string;
  birthday?: string;
  code?: string;
}

// Uhan Add
// Input 컴포넌트 value 값 설정 객체
interface BoxType {
  email: string;
  name: string;
  nickname: string;
  phone: string;
  birthday: string;
  code: string;
  pw: string;
  newPw: string;
  newPwCheck: string;
}

const MyPageBox = (props: MyPageBoxProps) => {
  const { isAdmin, email, name, nickname, phone, birthday, code } = props;

  /**
   * @author UHan
   * 객체에서 비밀번호는 꼭 키이름을 pw로 지정해줘야함
   * 객체에서 각각 하나씩 꺼내서 쓸 때 (ex. email을 사용하고 싶다 하면)
   * const email = (box as boxType).email;
   */
  const [box, setBox] = useState<object>({
    email: '',
    name: '',
    nickname: '',
    phone: '',
    birthday: '',
    code: '',
  });
  // 새로운 비밀번호를 위해 겹치는 pw 키네임 중복 피하기 위해 새 객체 생성
  const [newPw, setNewPw] = useState<object>({
    pw: '',
    pwCheck: '',
  });

  useEffect(() => {
    setBox({
      email: email,
      name: name,
      nickname: nickname,
      phone: phone,
      birthday: birthday,
      code: code,
    });
  }, [props]);

  const boxEmail = (box as BoxType).email;
  const boxName = (box as BoxType).name;
  const boxNickname = (box as BoxType).nickname;
  const boxPhone = (box as BoxType).phone;
  const boxBirthday = (box as BoxType).birthday;
  const boxCode = (box as BoxType).code;

  // 생년월일 입력 받으면
  // `${(user as userType).birth}T00:00:00.000` 이렇게 포맷팅

  return (
    <div className="my-5 flex flex-col h-screen">
      <p className="form-title text-white">마이페이지</p>
      <div className="flex items-center">
        <InputComponent
          text="이메일"
          type="email"
          keyName="email"
          value={boxEmail}
          getter={box}
          setter={setBox}
        />
      </div>
      {isAdmin ? (
        <>
          <div className="flex">
            <InputComponent
              text="회사명"
              type="text"
              keyName="name"
              value={boxName}
              getter={box}
              setter={setBox}
            />
          </div>
          <div className="flex">
            <InputComponent
              text="사업자 등록번호"
              type="text"
              value={boxCode?.toString()}
              keyName="code"
              getter={box}
              setter={setBox}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex">
            <InputComponent
              text="이름"
              type="text"
              keyName="name"
              value={boxName}
              getter={box}
              setter={setBox}
            />
          </div>
          <div className="flex">
            <InputComponent
              text="닉네임"
              type="text"
              keyName="nickname"
              value={boxNickname}
              getter={box}
              setter={setBox}
            />
          </div>
          <div className="flex">
            <InputComponent
              text="전화번호"
              type="text"
              keyName="phone"
              value={boxPhone}
              getter={box}
              setter={setBox}
            />
          </div>
          <div className="flex">
            <InputComponent
              text="생년월일"
              type="date"
              keyName="birthday"
              value={boxBirthday.split('T')[0]}
              getter={box}
              setter={setBox}
            />
          </div>
        </>
      )}
      <div className="flex">
        <PasswordFormComponent text="비밀번호" getter={box} setter={setBox} />
      </div>
      <div className="flex">
        <PasswordFormComponent
          text="새로운 비밀번호"
          getter={newPw}
          setter={setNewPw}
        />
      </div>
      <div className="flex">
        <InputComponent
          text="새로운 비밀번호 확인"
          type="password"
          keyName="pwCheck"
          getter={newPw}
          setter={setNewPw}
        />
      </div>
      <button className="self-center medium-white mb-5">수정하기</button>
      <div className="self-center text-black">
        <TextButtonComponent text={'탈퇴하기'} black={true} />
      </div>
    </div>
  );
};

export default MyPageBox;
