import { fetchLettersData } from '@/services/adminEvent';
import { useState, useEffect, useRef, MouseEvent } from 'react';

/**
 * ManagementModalBoxProps
 * @param isOpen => 모달 창이 열려있는지를 나타내는 boolean 값
 * @param onClose => 모달 창이 닫힐 때 호출되는 콜백 함수
 */

interface LetterModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
  uuid: string;
}

interface Letter {
  no: number; // 편지번호
  contents: string; // 내용
  email: string; // 팬유저이메일
  memberNo: number; // 연예인번호
  uuid: string; // 팬미팅번호
  name: string; // 연예인이름
  createDate: string; // 생성일
  editDate: string; // 수정일
}

interface LettersResponse {
  letters: Letter[]; // 팬미팅에 보내진 편지 목록
}

const LettersModalBox = ({ isOpen, onClose, uuid }: LetterModalBoxProps) => {
  const [letters, setLetters] = useState<LettersResponse>();
  const modalRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    const fetchLetters = async () => {
      const fetchedData = await fetchLettersData(uuid);
      if (fetchedData) {
        setLetters(fetchedData);
      }
    };
    fetchLetters();
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div
            ref={modalRef}
            className="w-l h-600 bg-white rounded-sm flex flex-col items-center"
          >
            <h1 className="h-1/6 form-title text-black flex items-center">
              편지 리스트
            </h1>
            <table className="w-4/5">
              <tbody>
                <tr>
                  <td className="w-1/6">보낸이</td>
                  <td className="flex-grow">내용</td>
                  <td className="w-1/6">받는이</td>
                </tr>
                {letters?.letters
                  .filter((letter) => letter.uuid === uuid)
                  .map((letter, index) => (
                    <tr key={index}>
                      <td className="w-1/6">{letter.email}</td>
                      <td className="flex-grow">{letter.contents}</td>
                      <td className="w-1/6">{letter.name}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default LettersModalBox;
