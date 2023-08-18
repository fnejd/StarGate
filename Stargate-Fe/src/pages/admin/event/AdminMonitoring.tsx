import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import adminPeerService from '@/peer/adminPeer';

const AdminMonitoring = () => {
  const [peers, setPeers] = useState([]);
  // const socketRef = useRef();
  const socketRef = useRef<WebSocket | null>(
    new WebSocket('ws://i9a406.p.ssafy.io:8080/rtc/asdf.12')
  );
  // const socket = socketRef.current;
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const peersRef = useRef([]);
  //   const roomID = props.match.params.roomID;
  const memberCnt = 5;

  const videoConstraints = {
    height: window.innerHeight / memberCnt,
    width: window.innerWidth / memberCnt,
  };

  //   useEffect(() => {
  //     // 서버에 소켓 연결을 초기화

  //     // 사용자 미디어 장치 권한 요청 및 스트림 획득
  //     navigator.mediaDevices
  //       .getUserMedia({ video: videoConstraints, audio: true })
  //       .then((stream) => {
  //         // 사용자 자신의 비디오 스트림을 화면에 표시
  //         userVideo.current.srcObject = stream;

  //         // 서버에 방 참여 요청 전송
  //         socketRef.current.emit('admin join', roomID);

  //         // 모든 사용자 목록을 받아옴
  //         socketRef.current.on('all users', (users) => {
  //           const peers = [];
  //           users.forEach((userID) => {
  //             // 각 사용자에 대한 Peer 연결 생성
  //             const peer = createPeer(userID, socketRef.current.id, stream);
  //             peersRef.current.push({
  //               peerID: userID,
  //               peer,
  //             });
  //             peers.push(peer);
  //           });
  //           setPeers(peers);
  //         });

  //         // 새로운 사용자가 방에 참여했을 때 처리
  //         socketRef.current.on('user joined', (payload) => {
  //           // 새로운 사용자에 대한 Peer 연결 생성
  //           const peer = addPeer(payload.signal, payload.callerID, stream);
  //           peersRef.current.push({
  //             peerID: payload.callerID,
  //             peer,
  //           });

  //           // 새로운 Peer 연결 추가하여 상태 업데이트
  //           setPeers((users) => [...users, peer]);
  //         });

  //         // 상대방으로부터의 반환된 시그널 처리
  //         socketRef.current.on('receiving returned signal', (payload) => {
  //           const item = peersRef.current.find((p) => p.peerID === payload.id);
  //           item.peer.signal(payload.signal);
  //         });
  //       });
  //   }, []);

  //   // Peer 연결 생성 함수
  //   function createPeer(userToSignal, callerID, stream) {
  //     const peer = new Peer({
  //       initiator: true,
  //       trickle: false,
  //       stream,
  //     });

  //     // 시그널링 메시지 전송
  //     peer.on('signal', (signal) => {
  //       socketRef.current.emit('sending signal', {
  //         userToSignal,
  //         callerID,
  //         signal,
  //       });
  //     });

  //     return peer;
  //   }

  //   // 기존 Peer에 반환된 시그널 처리 함수
  //   function addPeer(incomingSignal, callerID, stream) {
  //     const peer = new Peer({
  //       initiator: false,
  //       trickle: false,
  //       stream,
  //     });

  //     // 시그널링 메시지 전송
  //     peer.on('signal', (signal) => {
  //       socketRef.current.emit('returning signal', { signal, callerID });
  //     });

  //     // 반환된 시그널 처리
  //     peer.signal(incomingSignal);

  //     return peer;
  //   }

  return (
    <div>
      {/* 사용자 자신의 비디오 스트림을 표시하는 비디오 요소 */}
      {/* <video muted ref={userVideo} autoPlay playsInline /> */}

      {/* 연결된 다른 사용자의 비디오 스트림을 표시하는 Video 컴포넌트 */}
      {/* {peers.map((peer, index) => {
        return (
          <video
            muted
            ref={userVideo}
            autoPlay
            playsInline
            key={index}
            peer={peer}
          />
        );
      })} */}
    </div>
  );
};

export default AdminMonitoring;
