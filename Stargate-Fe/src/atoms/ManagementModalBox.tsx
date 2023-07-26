// ManagementModalBox.tsx
import React, { useRef, MouseEvent } from 'react';

/**
 * @param isOpen => 모달 창이 열려있는지를 나타내는 boolean 값
 * @param onClose => 모달 창이 닫힐 때 호출되는 콜백 함수
 * @param members => 선택된 그룹에 해당하는 멤버들의 정보가 담긴 객체
 */

interface ManagementModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
  members: { [index: string]: string };
}

const ManagementModalBox = ({
  isOpen,
  onClose,
  members,
}: ManagementModalBoxProps) => {

    /**
   * useRef훅을 사용해서 생성된 변수
   * Dom요소에 대한 참조를 보관할 수 있는 객체 
   */

  const modalRef = useRef<HTMLDivElement>(null);

  /**
   * MouseEvent 객체를 가져와서 실행
   * 모달 창 바깥을 클릭했을때, 모달창이 존재하고 클릭 이벤트가 모달 창 밖에서 실행됐다면 
   * onClose함수 호출
   */
  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50'
          onClick={handleOutsideClick}
        >
          <div ref={modalRef} className='w-96 h-96 bg-white rounded-lg p-4'>
            <h2 className='text-lg font-bold mb-4'>멤버 목록</h2>
            <ul>
              {Object.entries(members).map(([index, memberName]) => (
                <li key={index}>
                  {memberName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ManagementModalBox;