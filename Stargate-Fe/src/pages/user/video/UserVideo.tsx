import { useState, useRef, useCallback, useEffect } from 'react';
import ReactPlayer from 'react-player';
import peerService from '@/service/peer';

const UserVideo = () => {
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const myVideoRef = useRef<HTMLVideoElement | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(
    new WebSocket('ws://i9a406.p.ssafy.io:8080/rtc/asdf.12')
  );
  // const [socket, setSocket] = useState<WebSocket | null>(null);

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  // 상대 피어에 대한 ICE candidate 이벤트 핸들러 설정
  peerService.peer.onicecandidate = (e) => {
    if (e.candidate) {
      console.log('#####################################onicecandidate');
      socket.send(
        JSON.stringify({
          type: 'candidate',
          candidate: e.candidate,
        })
      );
    }
  };

  // ontrack 이벤트 핸들러를 등록하여 스트림 정보를 받을 때 사용자 목록을 업데이트
  peerService.peer.ontrack = (e) => {
    console.log('ontrack success');
    // console.log(e.stream);
    // setRemoteStream(e.stream);
    // console.log(remoteStream);
    // 로컬 미디어 스트림 확인
    console.log('Local media stream:', peerService.peer.getLocalStreams());

    // 원격 미디어 스트림 확인
    console.log('Remote media stream:', peerService.peer.getRemoteStreams());
    setRemoteStream(peerService.peer.getRemoteStreams());
  };

  // 상대방이 전화에 들어왔을때 실행되는 함수
  // 1. 내 미디어 세팅
  // 2. 내 오퍼 전송
  const getJoined = useCallback(async () => {
    try {
      // 내 미디어 세팅
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      if (stream) {
        console.log('localstream add');
        stream.getTracks().forEach((track) => {
          peerService.peer.addTrack(track, stream);
        });
      } else {
        console.log('no local stream');
        console.log(stream);
      }
      //       stream.getTracks().forEach(track => {
      //         peerService.peer.addTrack(track, stream);
      //       });
      //       // 로컬 미디어 스트림 확인
      // console.log("Local media stream:", peerService.peer.getLocalStreams());

      // // 원격 미디어 스트림 확인
      // console.log("Remote media stream:", peerService.peer.getRemoteStreams());
      setMyStream(stream);
      console.log('1-1. 내 미디어 연결');
      console.log(stream);

      // 이미 생성된 peerService 객체를 사용하여 getOffer 메소드 호출
      const offer = await peerService.getOffer();
      // 내 오퍼를 보낸다
      const offerData = {
        type: 'offer',
        // message: 'offer',
        offer: offer,
      };
      // offer를 문자열로 변환하여 서버로 전송
      socket.send(JSON.stringify(offerData));
      console.log('1-2. 오퍼를 상대에게 전송');
      console.log(offer);
    } catch (error) {
      // await peerService.setLocalDescription(new RTCSessionDescription(offer));
      console.error('Error setting up call:', error);
    }
  }, []);

  const getAnswer = useCallback(async (ans) => {
    const ansData = {
      type: 'ans',
      ans: ans,
    };
    socket.send(JSON.stringify(ansData));
    console.log('3. 응답보냄');
    console.log(peerService);
  }, []);

  useEffect(() => {
    console.log('컴포넌트 실행');

    // 웹소켓 서버 URL 설정
    // const socketUrl = 'ws://i9a406.p.ssafy.io:8080/rtc/asdf.12';
    const socketUrl = 'ws://i9a406.p.ssafy.io:8080/rtc/asdf.12';

    // 웹소켓 객체를 생성하고 서버와 연결합니다.
    // let socket = new WebSocket(socketUrl);
    // setSocket(socket);

    socket.onopen = async () => {
      console.log('서버 오픈~');

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      //       stream.getTracks().forEach(track => {
      //         peerService.peer.addTrack(track, stream);
      //       });
      //       // 로컬 미디어 스트림 확인
      // console.log("Local media stream:", peerService.peer.getLocalStreams());

      // // 원격 미디어 스트림 확인
      // console.log("Remote media stream:", peerService.peer.getRemoteStreams());
      setMyStream(stream);
      // console.log('1-1. 내 미디어 연결');
      // console.log(stream);

      const data = {
        type: 'join',
      };
      const dataString = JSON.stringify(data);
      console.log('조인 보낸다');
      socket.send(dataString); // 서버로 들어왔다는 메시지 'join' 전송

      socket.onmessage = async (event) => {
        console.log('EVENT = ', event); // 받은 메시지의 이벤트 정보를 로그 출력
        const receivedData = JSON.parse(event.data);
        console.log('rd', receivedData);
        // 상대가 조인했다는 메시지를 받음
        if (receivedData.type === 'join') {
          console.log('11111111111111111 상대가 조인했어요');
          getJoined();
        }
        if (receivedData.type === 'offer') {
          console.log('22222222222222222 상대에게 오퍼를 받았어요');
          console.log(receivedData.offer);
          // 상대 오퍼를 받았으면 answer 를 생성
          if (peerService.peer) {
            // 상대 오퍼를 받았으면 answer 를 생성
            console.log('상대 오퍼 받아서 ans 생성');
            const ans = await peerService.getAnswer(receivedData.offer);
            getAnswer(ans);
          }
        }
        if (receivedData.type === 'ans') {
          console.log('33333333333333333 상대에게 앤써를 받았어요');
          // console.log(receivedData.offer)
          console.log('fdadfasfasdfadsfa--------', receivedData.ans);
          await peerService.setLocalDescription(receivedData.ans);
          console.log('Connection state:', peerService.peer.connectionState);
          console.log(peerService);
          // sendIce();
          // sendStreams();
        }
        if (receivedData.type === 'candidate') {
          console.log('444444444444444444444 아이스를 받았어요');
          console.log(receivedData.candidate);

          const candidateObject = new RTCIceCandidate(receivedData.candidate);
          peerService.peer
            .addIceCandidate(candidateObject)
            .then(() => {
              console.log('ICE 후보자 추가 성공');
              // 로컬 미디어 스트림 확인
              console.log(
                'Local media stream:',
                peerService.peer.getLocalStreams()
              );

              // 원격 미디어 스트림 확인
              console.log(
                'Remote media stream:',
                peerService.peer.getRemoteStreams()
              );
            })
            .catch((error) => {
              console.error('ICE 후보자 추가 실패:', error);
            });
          console.log('Connection state:', peerService.peer.connectionState);
        }
      };
      // 컴포넌트 언마운트 시 연결 해제
      return () => {
        // socket.close(); // 웹소켓 연결을 해제합니다.
      };
    };
  }, []);

  return (
    <div>
      <h1>Room Page</h1>
      {myStream && (
        <>
          <h1>My Stream</h1>
          <ReactPlayer
            playing
            muted
            height="200px"
            width="300px"
            url={myStream}
          />
        </>
      )}
      {remoteStream && (
        <>
          <h1>Remote Stream</h1>
          <ReactPlayer
            playing
            muted
            height="400px"
            width="600px"
            url={remoteStream}
          />
        </>
      )}
    </div>
  );
};

export default UserVideo;
