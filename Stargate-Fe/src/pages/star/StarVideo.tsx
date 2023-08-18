import { useState, useCallback, useEffect, useMemo } from 'react';
import ReactPlayer from 'react-player';
import peerService from '@/peer/peer';
import NotepadComponent from '@/atoms/video/NotepadComponent';
import VideoHeaderComponent from '@/organisms/video/VideoHeaderComponent';
import { getStarMeetingDataApi } from '@/services/videoService';
import Swal from 'sweetalert2';

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

  const socket = useMemo(() => {
    return new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}${url}`);
  }, []);

  // 연결상태 변경시 콘솔에 출력
  peerService.peer.onconnectionstatechange = () => {
  };

  // 상대 피어에 대한 ICE candidate 이벤트 핸들러 설정
  peerService.peer.onicecandidate = (e) => {
    if (e.candidate) {
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
    setRemoteStream(peerService.peer.getRemoteStreams()[0]);
  };

  useEffect(() => {
    (async () => {
      // baek : 왠지모르지만 여기가 시간 엄청잡아먹음 한 1초? 근데 그 사이에 ICE 날아감.

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      if (stream) {
        stream.getTracks().forEach((track) => {
          peerService.peer.addTrack(track, stream);
        });
        setMyStream(stream);
      } else {
      }
      setMyStream(stream);
    })();
  }, []);

  // 팬이 전화에 들어왔을때 실행되는 함수
  // 1. 내 미디어 세팅
  // 2. 내 오퍼 전송
  const getJoined = useCallback(async (receivedData) => {
    try {
      // 이미 생성된 peerService 객체를 사용하여 getOffer 메소드 호출
      const ans = await peerService.getAnswer(receivedData);

      socket.send(JSON.stringify(ans));
    } catch (error) {
    }
  }, []);

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
      return;
    }

    socket.onopen = async () => {

      socket.onmessage = async (event) => {
        const receivedData = JSON.parse(event.data);

        if (receivedData.type === 'offer') {
          await getJoined(receivedData);
          setOnTimer(true);
        }

        if (receivedData.type === 'candidate') {
          // 받은 후보 데이터로 RTCIceCandidate 객체를 생성합니다.
          const candidateObject = new RTCIceCandidate(receivedData.candidate);

          // 이후, RTCIceCandidate를 RTCPeerConnection에 추가합니다.
          peerService.peer
            .addIceCandidate(candidateObject)
            .then(() => {
            })
            .catch((error) => {
            });
        }
      };
      // 컴포넌트 언마운트 시 연결 해제
      return () => {
        // socket.close(); // 웹소켓 연결을 해제합니다.
      };
    };
  }, [socket]);

  const getMeetingData = async () => {
    if (url === null) {
      Swal.fire('접속 오류', '올바른 접속을 시도해주세요.', 'error');
      return;
    }
    const roomId = url;

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
      .catch((error) => {});

    return;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!meetingData) await getMeetingData();
    };
    void fetchData();
  }, []);

  useEffect(() => {
    if (!meetingData) {
      return;
    }

    const meetingTime = meetingData.meetingTime - meetingData.photoNum * 10;
    setTimer((prev) => ({
      ...prev,
      min: Math.trunc(meetingTime / 60),
      sec: meetingTime % 60,
      waitingMin: Math.trunc(meetingData.waitingTime / 60),
      waitingSec: meetingData.waitingTime % 60,
    }));

    setPhotoNum(meetingData.photoNum);

    if (meetingData && meetingOrder === meetingData.meetingFUsers.length) {
      Swal.fire('통화 종료', '팬사인회가 종료되었습니다.', 'question');
    }
  }, [meetingData, meetingOrder]);

  const tickWaiting = () => {
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
        setTimeout(
          () =>
            setTimer((prevTimer) => ({
              ...prevTimer,
              waitingMin: prevTimer.waitingMin - 1,
              waitingSec: 59,
            })),
          1000
        );
      }
    }
  };

  useEffect(() => {
    if (timer.waitingMin === 0 && timer.waitingSec === 0) {
      setMeetingOrder(meetingOrder + 1);
      setOnTimer(false);
    }
  }, [timer.waitingMin, timer.waitingSec]);

  const tick = () => {
    // sec -1
    if (timer.sec > 0) {
      setTimer((prev) => ({
        ...prev,
        sec: prev.sec - 1,
      }));
    }
    if (timer.sec === 0 && timer.min > 0) {
      setTimeout(
        () =>
          setTimer((prevTimer) => ({
            ...prevTimer,
            min: prevTimer.min - 1,
            sec: 59,
          })),
        1000
      );
    }
  };

  useEffect(() => {
    if (timer.sec === 0 && timer.min > 0) {
      setTimeout(
        () =>
          setTimer((prevTimer) => ({
            ...prevTimer,
            min: prevTimer.min - 1,
            sec: 59,
          })),
        1000
      );
    } else if (timer.sec == 0 && timer.min == 0 && photoNum != 0) {
      // let screenshotCount = photoNum;
      let screenshotCount = 2;

      const intervalPhoto = setInterval(() => {
        if (screenshotCount > 0) {
          // takeScreenshotAndSend();
          screenshotCount--;
        }
      }, 10000);

      const intervalId = setInterval(() => {
        if (screenshotCount == 0) {
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
    if (peerService.peer && onTimer) {
      const intervalId = setInterval(() => {
        if (timer.sec > 0) {
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
      <div className="flex flex-row w-screen h-full justify-center">
        {meetingData && (
          <NotepadComponent
            meetingData={meetingData}
            initialMeetingOrder={meetingOrder}
          />
        )}
        <div className="flex w-full">
          {remoteStream && (
            <div className="text-center basis-1/2">
              <p>팬</p>
              <ReactPlayer
                playing
                // muted
                height="full"
                width="full"
                url={remoteStream}
              />
            </div>
          )}
          {myStream && (
            <div className="text-center basis-1/2">
              <p>연옌</p>
              <ReactPlayer
                playing
                // muted
                height="full"
                width="full"
                url={myStream}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StarVideo;
