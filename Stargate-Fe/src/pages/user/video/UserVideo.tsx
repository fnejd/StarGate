import { useState, useRef, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import peerService from '@/peer/peer';
import TimeLeftComponent from '@/atoms/common/TimeLeftComponent';
import { getUserVideo } from '@/services/userVideo';
import useInterval from '@/hooks/useInterval';

const UserVideo = () => {
  const uuid: string = useParams().uuid;
  const [videoData, setVideoData] = useState({});
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  // let socket;

  const [memberNos, setMemberNos] = useState([]); // 미팅 순서대로 고유번호가 담긴 값 (웹소켓 주소로 사용)
  const [timer, setTimer] = useState({
    minute: 0,
    second: 0,
    waitingMinute: 0,
    waitingSecond: 0,
  });
  // 미팅이 종료되고 대기 시간 시작할 때 사용하는 상태
  const [isWaiting, setIsWaiting] = useState(false);
  const [meetingOrder, setMeetingOrder] = useState(-1); // 이게 바뀌었을 때 미팅 순서가 넘어감

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
  const getAnswer = useCallback(
    async (ans) => {
      const ansData = {
        type: 'ans',
        ans: ans,
        time: videoData.meetingTime,
      };
      socket.send(JSON.stringify(ansData));
      console.log('3. 연예인한테 응답보냄');
      console.log(peerService);
    },
    [socket]
  );

  useEffect(() => {
    console.log('컴포넌트 실행');

    console.log('서버에서 데이터 받아옴');
    const fetchData = async () => {
      const data = await getUserVideo(uuid);
      const extractedMemberNos = data.meetingMembers.map(
        (member) => member.memberNo
      );
      console.log(extractedMemberNos);
      // 서버에서 받아온 데이터 저장
      // 멤버 순서 배열 할당
      setVideoData(data);
      setMemberNos(extractedMemberNos);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // 비디오 데이터 처음 들어왔을 때, 미팅 순서 바뀌었을 때 추적
    // 웹소켓 주소를 미팅 순서에 따라 업데이트
    const connectWebSocket = async () => {
      if (meetingOrder < memberNos.length) {
        const newSocket = new WebSocket(
          `ws://i9a406.p.ssafy.io:8080/api/rtc/${videoData.meetingMembers[meetingOrder].roomId}`
        );
        setSocket(newSocket); // 새로운 WebSocket 인스턴스를 상태로 업데이트
      }
    };

    connectWebSocket();

    // 분과 초 설정
    setTimer((prevTimer) => ({
      ...prevTimer,
      minute: parseInt(videoData.meetingTime / 60),
      second: parseInt(videoData.meetingTime % 60),
      waitingMinute: parseInt(videoData.waitingTime / 60),
      waitingSecond: parseInt(videoData.waitingTime % 60),
    }));
  }, [videoData, meetingOrder]);

  useEffect(() => {
    if (!socket) {
      console.log('소켓 초기화 안됨!!!!!!!!!!!!!!!!!!!!!');
      return; // socket이 초기화되지 않은 경우 처리
    }

    socket.onopen = async () => {
      console.log('서버 오픈~');
      console.log('팬 입장');
      console.log(socket);

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
  }, [socket]);

  console.log('미팅순서', meetingOrder);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////// 미팅 타이머 설정 코드 //////////////////////////
  const tickWaiting = () => {S
    console.log('대기시간으로 넘어감');
    // 미팅 시간이 끝나면 미팅 순서 넘어감 => 소켓 재설정 => 다시 타이머 재시작
    if (timer.waitingSecond === 0 && timer.waitingMinute === 0) {
      setMeetingOrder(meetingOrder + 1);
    }

    // 초 줄여주는 로직
    if (timer.waitingSecond > 0) {
      setTimer((prevTimer) => ({
        ...prevTimer,
        waitingSecond: prevTimer.waitingSecond - 1,
      }));
    }

    if (timer.waitingSecond === 0) {
      if (timer.waitingMinute > 0) {
        setTimer((prevTimer) => ({
          ...prevTimer,
          waitingMinute: prevTimer.waitingMinute - 1,
          waitingSecond: 59,
        }));
      }
    }
  };

  // 타이머 함수
  const tick = () => {
    // 초 줄여주는 로직
    if (timer.second > 0) {
      console.log('초 줄어듦');
      setTimer((prevTimer) => ({
        ...prevTimer,
        second: prevTimer.second - 1,
      }));
    }
  };

  useEffect(() => {
    if (timer.second === 0 && timer.minute > 0) {
      console.log('초가 0이 되어 분이 줄어듦');
      setTimer((prevTimer) => ({
        ...prevTimer,
        minute: prevTimer.minute - 1,
        second: 59,
      }));
    } else if (timer.second == 0 && timer.minute == 0) {
      tickWaiting();
    }
  }, [timer.second, timer.minute]);

  useEffect(() => {
    if (peerService.peer && timer) {
      const intervalId = setInterval(() => {
        console.log('타이머 시작!');
        tick();
      }, 1000); // 1초마다 실행

      return () => {
        clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
      };
    }
  }, [peerService.peer, meetingOrder]);

  // 초와 분 다시 가져와서 설정하는 함수
  // const getTime = () => {
  //   setMinute(parseInt(minute / 60));
  //   setSecond(parseInt(second % 60));
  // };

  // // 언제 초분 설정?
  // // 처음 가져왔을 때, 연예인한테도 쏴주고 내 분 초 설정
  // // 그리고 초와 분이 다 0초가 되었을 때 다시 설정
  // // 처음 비디오 데이터 값이 받아지면 초와 분 설정
  // useEffect(() => {
  //   getTime();
  // }, [videoData]);

  // 시간 추적하다가 초가 0이 될 때 타이머 인터벌 클리어
  // useEffect(() => {
  //   if (second === 0) {
  //     clearInterval(timerInterval);
  //   }
  // }, [minute, second]);

  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // 컴포넌트가 실행되면 서버에서 비디오데이터 받아옴
  // useEffect(() => {
  //   console.log('서버에서 데이터 받아옴');
  //   const fetchData = async () => {
  //     const data = await getUserVideo(uuid);
  //     const extractedMemberNos = data.meetingMembers.map(
  //       (member) => member.memberNo
  //     );
  //     console.log(extractedMemberNos);
  //     // 서버에서 받아온 데이터 저장
  //     // 멤버 순서 배열 할당
  //     setMemberNos(extractedMemberNos);
  //     setVideoData(data);
  //   };

  //   fetchData();
  // }, []);

  // // 비디오데이터가 들어오면 웹 소켓 주소 업데이트
  // // 미팅 순서가 변경되면 웹 소켓 주소 업데이트
  // useEffect(() => {
  //   // 웹소켓 주소를 업데이트하고 연결하는 함수
  //   const connectWebSocket = () => {
  //     if (meetingOrder < memberNos.length) {
  //       socketUrl = new WebSocket(
  //         `ws://i9a406.p.ssafy.io:8080/api/rtc/${videoData.meetingMembers[meetingOrder].roomId}`
  //       );
  //       socket = socketUrl.current;
  //     }
  //   };

  //   connectWebSocket();
  // }, [videoData, meetingOrder]);

  // useEffect(() => {}, [memberNos]);

  return (
    <div>
      {socket && (
        <TimeLeftComponent
          min={
            timer.minute === 0 && timer.second === 0
              ? timer.waitingMinute
              : timer.minute
          }
          sec={
            timer.minute === 0 && timer.second === 0
              ? timer.waitingSecond
              : timer.second
          }
        />
      )}
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
