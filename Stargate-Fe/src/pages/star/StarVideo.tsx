import { useState, useRef, useCallback, useEffect } from 'react';
import ReactPlayer from 'react-player';
import peerService from '@/peer/peer';
import NotepadComponent from '@/atoms/video/NotepadComponent';
import VideoHeaderComponent from '@/organisms/video/VideoHeaderComponent';
import { getStarMeetingDataApi } from '@/services/videoService';

interface starMeetingDataType {
  waitingTime: number;
  meetingTime: number;
  photoNum: number;
  memberNo: number;
  meetingFUsers: {
    email: string;
    name: string;
    nickname: string;
    birthday: string;
    isPolaroidEnable: boolean;
    postitContents: string;
    totalMeetingCnt: number;
  }[];
}

const StarVideo = () => {
  const roomId = new URLSearchParams(location.search);
  const url = roomId.get('roomId') ? roomId.get('roomId') : 'Null';
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const socketRef = useRef<WebSocket>(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    new WebSocket(`ws://i9a406.p.ssafy.io:8080/api/rtc/${url}`)
  );
  const socket = socketRef.current;

  // 연결상태 변경시 콘솔에 출력
  peerService.peer.onconnectionstatechange = () => {
    console.log('state changed');
    console.log(peerService.peer.connecticonState);
  };

  // 상대 피어에 대한 ICE candidate 이벤트 핸들러 설정
  peerService.peer.onicecandidate = (e) => {
    if (e.candidate) {
      console.log(
        '#####################################ICE candidate 이벤트 핸들러 설정'
      );
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
  };

  // 팬이 전화에 들어왔을때 실행되는 함수
  // 1. 내 미디어 세팅
  // 2. 내 오퍼 전송
  const getJoined = useCallback(async () => {
    try {
      console.log('내 미디어 세팅');
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      if (stream) {
        console.log('스트림이 있으면 피어에 추가');
        stream.getTracks().forEach((track) => {
          peerService.peer.addTrack(track, stream);
        });
        setMyStream(stream);
        console.log(peerService.peer);
        console.log('1-1. 팬한테 내 미디어 연결');
        // 로컬 미디어 스트림 확인
        console.log('Local media stream:', peerService.peer.getLocalStreams());
        // 원격 미디어 스트림 확인
        console.log(
          'Remote media stream:',
          peerService.peer.getRemoteStreams()
        );
      } else {
        console.log('no local stream');
        console.log(stream);
      }
      setMyStream(stream);

      // 이미 생성된 peerService 객체를 사용하여 getOffer 메소드 호출
      const offer = await peerService.getOffer();
      // 내 오퍼를 보낸다
      const offerData = {
        type: 'offer',
        offer: offer,
      };
      // offer를 문자열로 변환하여 서버로 전송
      socket.send(JSON.stringify(offerData));
      console.log('1-2. 팬한테 오퍼 전송');
      console.log(offer);
    } catch (error) {
      console.error('Error setting up call:', error);
    }
  }, []);

  const [receiveTime, setReceiveTime] = useState(0);
  const [timer, setTimer] = useState({
    min: 0,
    sec: 0,
    waitingMin: 0,
    waitingSec: 0,
  });
  const [onTimer, setOnTimer] = useState(false);
  const [meetingOrder, setMeetingOrder] = useState(-1);
  const [photoNum, setPhotoNum] = useState(0);
  const [meetingData, setMeetingData] = useState<starMeetingDataType | null>(
    null
  );

  useEffect(() => {
    if (!socket) {
      console.log('socket Connecting Plz');
      return;
    }

    socket.onopen = async () => {
      console.log('서버 오픈~');
      console.log('연예인 입장');

      socket.onmessage = async (event) => {
        console.log('EVENT = ', event); // 받은 메시지의 이벤트 정보를 로그 출력
        const receivedData = JSON.parse(event.data);
        console.log('rd', receivedData);
        // 상대가 조인했다는 메시지를 받음
        if (receivedData.type === 'join') {
          console.log('11111111111111111 어 팬 들어왔다');
          getJoined();
        }
        if (receivedData.type === 'ans') {
          console.log('33333333333333333 팬한테 앤써를 받았어요');
          await peerService.setLocalDescription(receivedData.ans);
          console.log('Connection state:', peerService.peer.connectionState);
          setReceiveTime(receivedData.time);

          setOnTimer(true);
        }
        if (receivedData.type === 'candidate') {
          console.log('444444444444444444444 아이스를 받았어요');
          console.log(receivedData.candidate);

          // 받은 후보 데이터로 RTCIceCandidate 객체를 생성합니다.
          const candidateObject = new RTCIceCandidate(receivedData.candidate);

          // 이후, RTCIceCandidate를 RTCPeerConnection에 추가합니다.
          peerService.peer
            .addIceCandidate(candidateObject)
            .then(() => {
              console.log('ICE 후보자 추가 성공');
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
  }, [socket]);

  const getMeetingData = async () => {
    const roomId =
      url != null
        ? url
        : '127baa3f-63df-47e9-a4ab-ff0469737881.002d4659-12b8-430c-a3c1-88beb3df8adb';

    await getStarMeetingDataApi(roomId)
      .then((res: starMeetingDataType | undefined) => {
        if (res != undefined) {
          setMeetingData({
            waitingTime: res.waitingTime,
            meetingTime: res.meetingTime,
            photoNum: res.photoNum,
            memberNo: res.memberNo,
            meetingFUsers: res.meetingFUsers,
          });
        }
      })
      .catch((error) => console.log(error));

    return;
  };

  useEffect(() => {
    console.log('컴포넌트 실행~~');

    console.log('fetch start');
    const fetchData = async () => {
      if (!meetingData) await getMeetingData();
    };
    void fetchData();
    console.log(meetingData);
  }, []);

  useEffect(() => {
    console.log(meetingData);
    if (!meetingData) {
      console.log('아직 데이터 없음!');
      return;
    }

    const meetingTime = receiveTime;
    setTimer((prev) => ({
      ...prev,
      min: Math.trunc(meetingTime / 60),
      sec: meetingTime % 60,
      waitingMin: Math.trunc(meetingData.waitingTime / 60),
      waitingSec: meetingData.waitingTime % 60,
    }));

    console.log(timer);

    setPhotoNum(meetingData.photoNum);

    if (meetingData && meetingOrder === meetingData.meetingFUsers.length) {
      // 통화 종료 시 이벤트 핸들링
    }
  }, [meetingData, meetingOrder, receiveTime]);

  const tickWaiting = () => {
    console.log('대기 시간 으로 넘 ㅓ어 감');

    if (timer.waitingSec > 0) {
      setTimer((prev) => ({
        ...prev,
        waitingSec: prev.waitingSec - 1,
      }));
    }

    if (timer.waitingSec === 0) {
      if (timer.waitingMin > 0) {
        setTimer((prev) => ({
          ...prev,
          waitingMin: prev.waitingMin - 1,
          waitingSec: 59,
        }));
      }
    }
  };

  useEffect(() => {
    if (timer.waitingMin === 0 && timer.waitingSec === 0) {
      console.log('미팅 순서 변경');
      setMeetingOrder(meetingOrder + 1);
      setOnTimer(false);
    }
  }, [timer.waitingMin, timer.waitingSec]);

  const tick = () => {
    console.log('Tick Method Start', timer.sec);

    // sec -1
    if (timer.sec > 0) {
      setTimer((prev) => ({
        ...prev,
        sec: prev.sec - 1,
      }));
    }
    if (timer.sec === 0 && timer.min > 0) {
      console.log('초가 0이 되어 분이 줄어든다잉');
      setTimer((prev) => ({
        ...prev,
        min: prev.min - 1,
        sec: 59,
      }));
    }
  };

  useEffect(() => {
    console.log('timer start');
    if (timer.sec === 0 && timer.min > 0) {
      console.log('초가 0이 되어 분이 줄어든다잉');
      setTimer((prev) => ({
        ...prev,
        min: prev.min - 1,
        sec: 59,
      }));
    } else if (timer.sec == 0 && timer.min == 0 && photoNum != 0) {
      // let screenshotCount = photoNum;
      let screenshotCount = 2;

      const intervalPhoto = setInterval(() => {
        if (screenshotCount > 0) {
          console.log('Photo Shot');
          // takeScreenshotAndSend();
          screenshotCount--;
        }
      }, 10000);

      const intervalId = setInterval(() => {
        if (screenshotCount == 0) {
          console.log('WaitingTimer Run');
          tickWaiting();
        }
      }, 1000);

      return () => {
        clearInterval(intervalPhoto);
        clearInterval(intervalId);
      };
    }
  }, [timer.sec, timer.min, photoNum]);

  useEffect(() => {
    console.log(onTimer);
    if (peerService.peer && onTimer) {
      const intervalId = setInterval(() => {
        if (timer.sec > 0) {
          console.log('타이머 시작!@!@!!');
          tick();
        }
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [meetingOrder, timer.sec, onTimer]);

  return (
    <div className="w-screen h-screen">
      <VideoHeaderComponent
        min={timer.min}
        sec={timer.sec}
        type="star"
        participantsData={meetingData && meetingData.meetingFUsers}
        meetingIdx={meetingOrder}
      />
      <div className="flex flex-row w-screen h-full">
        <NotepadComponent
          meetingData={meetingData}
          initialMeetingOrder={meetingOrder}
        />
        {myStream && (
          <div className="basis-1/2">
            <p>연옌</p>
            <ReactPlayer
              playing
              muted
              height="full"
              width="full"
              url={myStream}
            />
          </div>
        )}
        {remoteStream && (
          <div className="basis-1/2">
            <p>팬</p>
            <ReactPlayer
              playing
              muted
              height="full"
              width="full"
              url={remoteStream}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StarVideo;
