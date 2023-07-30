import React, { createContext, useMemo, useContext } from 'react';
import { io, Socket } from 'socket.io-client'; // 소켓 라이브러리에서 Socket 타입 추가

// 소켓 컨텍스트 생성
const SocketContext = createContext<Socket<
  DefaultEventsMap,
  DefaultEventsMap
> | null>(null); // Socket 타입으로 createContext를 제네릭으로 정의

// 소켓 컨텍스트를 사용하는 Hook
// 소켓 인스턴스에 접근을 도움
export const useSocket = (): Socket<
  DefaultEventsMap,
  DefaultEventsMap
> | null => {
  const socket = useContext(SocketContext);
  return socket;
};

interface SocketProviderProps {
  socketURL: string;
  children: React.ReactNode; // children prop 추가
}

// 소켓 프로바이더 컴포넌트 정의
export const SocketProvider: React.FC<SocketProviderProps> = ({
  socketURL,
  children,
}) => {
  // useMemo를 사용하여 중복 연결을 방지하고 실제로 한 번만 소켓 인스턴스 생성
  const socket: Socket<DefaultEventsMap, DefaultEventsMap> = useMemo(
    () =>
      io.connect(socketURL, {
        cors: { origin: '*' },
      }),
    []
  );

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
