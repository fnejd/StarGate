import { useState, useEffect, useRef } from 'react';

const useDropdown = <T extends HTMLElement>(initialState: boolean) => {
  // 드롭다운 열려있는지 상태
  const [isOpen, setIsOpen] = useState<boolean>(initialState);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      // ref.current가 유효하고 클릭된 요소(e.target)이 ref.current 안에 없는 경우 (ref.current 외부를 클릭한 경우)
      if (ref.current && !ref.current.contains(e.target as Node)) {
        // 드롭다운 닫기
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isOpen]);

  return [isOpen, setIsOpen] as const;
};

export default useDropdown;