import { useState, useRef, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import peerService from '@/peer/peer';
import { getUserVideo } from '@/services/userVideo';
import useInterval from '@/hooks/useInterval';

const UserVideo = () => {
  const uuid: string = useParams().uuid;
  const [videoData, setVideoData] = useState({});
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  // const socketRef = useRef<WebSocket | null>(
  //   new WebSocket('ws://i9a406.p.ssafy.io:8080/api/rtc/asdf')
  // );
  // const socket = socketRef.current;

  // 연결상태 변경시 콘솔에 출력
  peerService.peer.onconnectionstatechange = () => {
    console.log('state changed');
    console.log(peerService.peer.connectionState);
  };

  // 상대 피어에 대한 ICE candidate 이벤트 핸들러 설정
  peerService.peer.onicecandidate = (e) => {
    if (e.candidate) {
      console.log('############ICE candidate 이벤트 핸들러 설정');
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
    // 로컬 미디어 스트림 확인
    console.log('Local media stream:', peerService.peer.getLocalStreams());

    // 원격 미디어 스트림 확인
    console.log('Remote media stream:', peerService.peer.getRemoteStreams());
    setRemoteStream(peerService.peer.getRemoteStreams()[0]);

    // 원격 미디어 스트림이 있을 경우, 원격 비디오를 표시하기 위해 remoteStream을 연결합니다.
    if (remoteStream) {
      console.log('&&&&&&&&&&&상대방 화면 등록');
      remoteVideoRef.current!.srcObject = remoteStream;
    }
  };

  // 연예인한테 오퍼 받았을 때 답장 보내는 함수
  const getAnswer = useCallback(async (ans) => {
    const ansData = {
      type: 'ans',
      ans: ans,
    };
    socket.send(JSON.stringify(ansData));
    console.log('3. 연예인한테 응답보냄');
    console.log(peerService);
  }, []);

  useEffect(() => {
    console.log('컴포넌트 실행');

    // 웹소켓 서버 URL 설정
    const socketUrl = 'ws://i9a406.p.ssafy.io:8080/rtc/asdf.12';
    const socket = socketRef.current;

    socket.onopen = async () => {
      console.log('서버 오픈~');
      console.log('팬 입장');

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      stream.getTracks().forEach((track) => {
        peerService.peer.addTrack(track, stream);
      });
      // 로컬 미디어 스트림 확인
      console.log('Local media stream:', peerService.peer.getLocalStreams());

      // 원격 미디어 스트림 확인
      setMyStream(stream);

      const data = {
        type: 'join',
      };
      const dataString = JSON.stringify(data);
      console.log('조인 보낸다 팬 들어왔어요~~');
      socket.send(dataString); // 서버로 들어왔다는 메시지 'join' 전송

      socket.onmessage = async (event) => {
        console.log('EVENT = ', event); // 받은 메시지의 이벤트 정보를 로그 출력
        const receivedData = JSON.parse(event.data);
        console.log('rd', receivedData);
        if (receivedData.type === 'offer') {
          console.log('22222222222222222 연예인한테 오퍼를 받았어요');
          console.log(receivedData.offer);
          // 상대 오퍼를 받았으면 answer 를 생성
          if (peerService.peer) {
            // 상대 오퍼를 받았으면 answer 를 생성
            console.log('상대 오퍼 받아서 ans 생성');
            const ans = await peerService.getAnswer(receivedData.offer);
            getAnswer(ans);
          }
        }
        if (receivedData.type === 'candidate') {
          console.log('444444444444444444444 아이스를 받았어요');
          console.log(receivedData.candidate);

          const candidateObject = new RTCIceCandidate(receivedData.candidate);
          peerService.peer
            .addIceCandidate(candidateObject)
            .then(() => {
              console.log('ICE 후보자 추가 성공');
              setRemoteStream(peerService.peer.getRemoteStreams()[0]);
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [memberNos, setMemberNos] = useState([]); // 미팅 순서대로 고유번호가 담긴 값 (웹소켓 주소로 사용)
  const [timeout, setTimeout] = useState(false); // 미팅 시간 다 끝났을 때 true, 아닐 때는 false
  const [sec, setSec] = useState();
  // 멤버 고유번호(미팅 순서에 따른 웹소켓 주소)를 배열에 할당
  let currentMemberIndex = 0;
  let socketUrl = '';
  let socket;

  useEffect(() => {}, [memberNos]);
  useEffect(() => {
    // 웹소켓 주소를 업데이트하고 연결하는 함수
    const connectWebSocket = () => {
      if (currentMemberIndex < memberNos.length) {
        socketUrl = `ws://i9a406.p.ssafy.io:8080/api/rtc/${memberNos[currentMemberIndex]}`;
        socket = new WebSocket(socketUrl);

        // 웹소켓과 관련된 작업 수행
        // ...
      }
    };

    connectWebSocket();
  }, [videoData]);

  // 컴포
  useEffect(() => {
    console.log('서버에서 데이터 받아옴');
    const fetchData = async () => {
      const data = await getUserVideo(uuid);
      const extractedMemberNos = data.meetingMembers.map(
        (member) => member.memberNo
      );
      console.log(extractedMemberNos);
      // 서버에서 받아온 데이터 저장
      // 멤버 순서 배열 할당
      setMemberNos(extractedMemberNos);
      setVideoData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Room Page</h1>
      {myStream && (
        <div className="flex">
          <h6>내 영상</h6>
          <ReactPlayer
            playing
            muted
            height="150px"
            width="200px"
            url={myStream}
          />
        </div>
      )}
      {remoteStream && (
        <>
          <h6>연예인 영상</h6>
          <ReactPlayer
            playing
            muted
            height="1000px"
            width="800px"
            url={remoteStream}
          />
        </>
      )}
    </div>
  );
};

export default UserVideo;
