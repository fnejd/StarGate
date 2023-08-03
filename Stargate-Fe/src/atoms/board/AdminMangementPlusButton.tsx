import React from 'react';

/**
 * AdminMangementPlusButtonProps
 * @param onClick => 버튼이 클릭될때 호출되는 콜백 함수, 부모 컴포넌트에서 원하는 동작을 onClick으로 정의해서 전달가능
 */

interface AdminMangementPlusButtonProps {
  onClick?: () => void;
}

const AdminMangementPlusButton = (props: AdminMangementPlusButtonProps) => {
  const { onClick } = props;

  return (
    <>
      <p className="t3r flex items-center cursor-pointer" onClick={onClick}>
        +
      </p>
    </>
  );
};

export default AdminMangementPlusButton;
