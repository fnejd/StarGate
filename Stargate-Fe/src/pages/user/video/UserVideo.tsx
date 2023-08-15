import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import ReactPlayer from 'react-player';
import peerService from '@/peer/peer';
import VideoHeaderComponent from '@/organisms/video/VideoHeaderComponent';
import NotepadComponent from '@/atoms/video/NotepadComponent';
import { getUserVideo, postPicture } from '@/services/userVideo';
import * as bodyPix from '@tensorflow-models/body-pix';

const UserVideo = () => {
  const navigate = useNavigate();
  const uuid: string = useParams().uuid;
  const [videoData, setVideoData] = useState(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const [memberNos, setMemberNos] = useState([]); // 미팅 순서대로 고유번호가 담긴 값 (웹소켓 주소로 사용)
  const [photoNum, setPhotoNum] = useState(null);
  const [picTime, setPictime] = useState(10);
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
    // videoData가 비어있지 않은 경우에만 실행
    if (videoData) {
      // 비디오 데이터 처음 들어왔을 때, 미팅 순서 바뀌었을 때 추적
      // 웹소켓 주소를 미팅 순서에 따라 업데이트
      const connectWebSocket = async () => {
        if (
          meetingOrder < videoData.meetingMembers.length &&
          meetingOrder > -1
        ) {
          const newSocket = new WebSocket(
            `ws://i9a406.p.ssafy.io:8080/api/rtc/${videoData.meetingMembers[meetingOrder].roomId}`
          );
          setSocket(newSocket); // 새로운 WebSocket 인스턴스를 상태로 업데이트
        }
      };

      console.log('소켓 주소 업데이트$$$$$$$$$', socket);
      connectWebSocket();

      // const meetingTime = videoData.meetingTime - photoNum * 10;
      const meetingTime = videoData.meetingTime - 2 * 10;

      // 분과 초 설정
      setTimer((prevTimer) => ({
        ...prevTimer,
        minute: Math.floor(meetingTime / 60),
        second: meetingTime % 60,
        waitingMinute: Math.floor(videoData.waitingTime / 60),
        waitingSecond: videoData.waitingTime % 60,
      }));
      // setPhotoNum(videoData.photoNum);
      setPhotoNum(2);
    }

    if (videoData && meetingOrder === videoData.meetingMembers.length) {
      navigate(`/remind/${uuid}`);
    }
  }, [videoData, meetingOrder]);

  console.log('대기 시간 설정', timer, photoNum);
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
  const tickWaiting = () => {
    console.log('대기시간으로 넘어감');

    // 초 줄여주는 로직
    if (timer.waitingSecond > 0) {
      console.log('대기시간 초 줄여주는 로직');
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

  useEffect(() => {
    if (timer.waitingMinute === 0 && timer.waitingSecond === 0) {
      console.log('미팅 순서 변경');
      setMeetingOrder(meetingOrder + 1);
    }
  }, [timer.waitingMinute, timer.waitingSecond]);

  // 타이머 함수
  const tick = () => {
    console.log('틱 시작', timer.second);
    // 초 줄여주는 로직
    if (timer.second > 0) {
      console.log('초 줄어듦');
      setTimer((prevTimer) => ({
        ...prevTimer,
        second: prevTimer.second - 1,
      }));
    }
    if (timer.second === 0 && timer.minute > 0) {
      console.log('초가 0이 되어 분이 줄어듦');
      setTimer((prevTimer) => ({
        ...prevTimer,
        minute: prevTimer.minute - 1,
        second: 59,
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
    } else if (timer.second == 0 && timer.minute == 0 && photoNum != 0) {
      // let screenshotCount = videoData.photoNum;
      let screenshotCount = 2;

      const intervalPhoto = setInterval(() => {
        if (screenshotCount > 0) {
          console.log('촬영 시작**************8');
          takeScreenshotAndSend();
          screenshotCount--;
        }
      }, 10000); // 10초마다 실행

      const intervalId = setInterval(() => {
        if (screenshotCount == 0) {
          console.log('대기시간타이머 시작!');
          tickWaiting();
        }
      }, 1000); // 1초마다 실행

      return () => {
        clearInterval(intervalPhoto); // 컴포넌트 언마운트 시 interval 정리
        clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
      };
    }
  }, [timer.second, timer.minute, photoNum]);

  useEffect(() => {
    if (peerService.peer) {
      const intervalId = setInterval(() => {
        if (timer.second > 0) {
          console.log('타이머 시작!');
          tick();
        }
      }, 1000); // 1초마다 실행

      return () => {
        clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
      };
    }
  }, [meetingOrder, timer.second]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  // 폴라로이드 촬영 및 전송
  const takeScreenshotAndSend = async () => {
    const videoContainer = document.getElementById('video-container');
    const canvas = await html2canvas(videoContainer);

    // 스크린샷을 이미지 데이터로 변환
    const screenshotData = canvas.toDataURL('image/jpeg');

    const takePhoto = async () => {
      // Data URI를 Blob으로 변환하는 함수
      const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeString });
      };

      const blobImage = dataURItoBlob(screenshotData);

      const formData = new FormData();
      formData.append('uuid', uuid);
      formData.append('email', videoData.email);
      formData.append(
        'memberNo',
        videoData.meetingMembers[meetingOrder].memberNo.toString()
      ); // memberNo는 문자열로 변환하여 추가
      formData.append('imageFile', blobImage, 'screenshot.jpg');

      for (const key of formData.keys()) {
        console.log(key, formData.get(key));
      }
      const response = await postPicture(formData);
      console.log('사진 촬영', response);
    };

    // takePhoto();
  };
  ///////////////////////////////////////////////////////////////////////////////////////////

  // const performBodyPixSegmentation = async (videoElement) => {
  //   const net = await bodyPix.load({
  //     architecture: 'ResNet50',
  //     outputStride: 32,
  //     quantBytes: 2,
  //   });

  //   const segmentation = await net.segmentPerson(videoElement);
  //   const backgroundBlurAmount = 3;
  //   const edgeBlurAmount = 3;
  //   const flipHorizontal = false;

  //   const canvas = document.getElementById('canvas');

  //   bodyPix.drawBokehEffect(
  //     canvas,
  //     img,
  //     segmentation,
  //     backgroundBlurAmount,
  //     edgeBlurAmount,
  //     flipHorizontal
  //   );

  //   console.log(segmentation);
  // };

  // useEffect(() => {
  //   if (myStream) {
  //     const video = document.getElementById('webcam'); // 비디오 엘리먼트
  //     video.play();

  //     performBodyPixSegmentation(video); // BodyPix 세분화 및 효과 적용
  //   }
  // }, [myStream]);

  return (
    <div className="w-screen h-screen">
      {socket && (
        <VideoHeaderComponent
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
          type="user"
        />
      )}
      <div className="flex flex-row w-screen h-full">
        {videoData && (
          <NotepadComponent
            videoData={videoData}
            initialMeetingOrder={meetingOrder}
          />
        )}
        <div id="video-container">
          {myStream && (
            <div className="basis-1/2 text-center">
              <span className="form-title">내 영상</span>
              <ReactPlayer
                playing
                muted
                height="full"
                width="full"
                url={myStream}
              />
              {/* <video
              ref={(video) => {
                if (video) {
                  video.play(); // 비디오 재생 시작
                  performBodyPixSegmentation(video)
                    .then((segmentation) => {
                      // 세분화 결과를 여기서 처리할 수 있습니다.
                      // 세분화 결과를 사용하여 캔버스 수정이나 배경 제거 적용 가능
                    })
                    .catch((error) => {
                      console.error('BodyPix 세분화 오류:', error);
                    });
                }
              }}
              id="webcam"
              autoPlay
              playsInline
              width="640"
              height="480"
            ></video> */}
            </div>
          )}
          {remoteStream && (
            <div className="basis-1/2 text-center">
              <span className="form-title">연예인 영상</span>
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
    </div>
  );
};

export default UserVideo;
