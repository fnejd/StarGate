import { useEffect, useRef } from 'react';

interface useIntervalProps {
  (callback: () => void, delay: number): void;
}

const useInterval: useIntervalProps = (callback, delay) => {
  // useRef를 사용해 렌더 횟수 최소화
  const savedCallback = useRef<(() => void) | null>(null);

  // callback에 변화가 감지될 때 감지해 최신 상태 유지
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 인터벌이랑 클로저 세팅
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay != null) {
      const id = setInterval(tick, delay);
      // Memory 효율성을 위해 바로바로 클로저 해주기
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
