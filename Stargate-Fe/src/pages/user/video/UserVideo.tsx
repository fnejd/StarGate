import React, { useEffect, useCallback, useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import peer from '@/service/peer';
import { useSocket, SocketProvider } from '@/context/SocketProvider';

const UserVideo = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const handleCallStart = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);

    const peerConnection = new RTCPeerConnection();
    peer.peer = peerConnection;

    // 멀티스트림 사용 설정
    peerConnection.setParameters({
      video: { rid: 'h', maxBitrate: 2000000 },
      audio: true,
    });

    const offer = await peer.getOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
  }, []);

  useEffect(() => {
    handleCallStart();
    peer.peer?.addEventListener('track', async (ev) => {
      const remoteStream = ev.streams[0];
      console.log('GOT TRACKS!!');
      setRemoteStream(remoteStream);
    });
  }, [handleCallStart]);

  useEffect(() => {
    if (myStream && myVideoRef.current) {
      myVideoRef.current.srcObject = myStream;
    }
  }, [myStream]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <SocketProvider socketURL="wss://i9a406.p.ssafy.io:8080/rtc/asdf.12">
      <div>
        <h1>Room Page</h1>
        <h4>{remoteSocketId ? 'Connected' : 'No one in room'}</h4>
        {myStream && (
          <>
            <h1>My Stream</h1>
            <ReactPlayer playing muted height="100px" width="200px" />
            <video
              ref={myVideoRef}
              autoPlay
              muted
              style={{ width: '400px' }}
            ></video>
          </>
        )}
        {remoteStream && (
          <>
            <h1>Remote Stream</h1>
            <ReactPlayer playing muted height="100px" width="200px" />
            <video
              ref={remoteVideoRef}
              autoPlay
              style={{ width: '200px' }}
            ></video>
          </>
        )}
      </div>
    </SocketProvider>
  );
};

export default UserVideo;
