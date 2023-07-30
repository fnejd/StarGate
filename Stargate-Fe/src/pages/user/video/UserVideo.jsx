import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const WebSocketTest = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    // 웹소켓 서버 URL 설정
    const socketUrl = 'ws://i9a406.p.ssafy.io:8080/rtc/asdf.12';

    // 웹소켓 서버에 연결
    const socket = io.connect(socketUrl, {
      cors: { origin: '*' },
    });
    setSocket(socket);

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      socket.disconnect();
    };
  }, []);

  // 웹소켓으로 텍스트 메시지 보내는 함수
  const sendMessage = () => {
    if (socket && message) {
      socket.emit('message', message);
    }
  };

  // 웹소켓으로부터 메시지를 받아 처리하는 함수
  useEffect(() => {
    if (socket) {
      socket.on('message', (data) => {
        setReceivedMessage(data);
      });
    }
  }, [socket]);

  return (
    <div>
      <h2>WebSocket Test</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <p>Received Message: {receivedMessage}</p>
    </div>
  );
};

export default WebSocketTest;
