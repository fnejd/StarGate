import React, { useRef, MouseEvent } from 'react';
import BtnWhite from '@/atoms/common/BtnWhite';
import { useNavigate } from 'react-router-dom';

interface IdResultModal {
  email: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * @param isOpen => 모달창 visiable 상태 불리언값
 * @param onClose() => 모달창 닫아지는 이벤트 담긴 함수
 */

const IdResultModal = ({ email, isOpen, onClose }: IdResultModal) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const closeIdModal = () => {
    onClose();
    navigate('/');
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          {email == 'NoData' ? (
            <div ref={modalRef} className="w-fit h-fit bg-white rounded-lg p-4">
              <div className="text-black backdrop:card bg-white p-5 rounded-lg m-5">
                <p className="mt-4 mb-8 form-title text-black">
                  조회된 아이디가 없습니다람쥐.
                </p>
                <BtnWhite text="확인" onClick={onClose} />
              </div>
            </div>
          ) : (
            <div ref={modalRef} className="w-fit h-fit bg-white rounded-lg p-4">
              <div className="text-black backdrop:card bg-white p-5 rounded-lg m-5">
                <p className="mt-4 form-title text-black">아이디 찾기</p>
                <p className="mt-4 modal-title text-black">조회된 아이디</p>
                <div className="flex m-3 mb-8 justify-center">
                  <p className="">ID: {email}</p>
                </div>
                <BtnWhite text="확인" onClick={closeIdModal} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default IdResultModal;
