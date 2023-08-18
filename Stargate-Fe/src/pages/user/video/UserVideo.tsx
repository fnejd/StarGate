import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import ReactPlayer from 'react-player';
import peerService from '@/peer/peer';
import VideoHeaderComponent from '@/organisms/video/VideoHeaderComponent';
import NotepadComponent from '@/atoms/video/NotepadComponent';
import { getUserVideo, postPicture } from '@/services/userVideo';
import PhotoTimer from '@/atoms/video/PhotoTimer';
import * as bodyPix from '@tensorflow-models/body-pix';

const UserVideo = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const uuid: string = useParams().uuid;
  const [videoData, setVideoData] = useState(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const [memberNos, setMemberNos] = useState([]); // 미팅 순서대로 고유번호가 담긴 값 (웹소켓 주소로 사용)
  const [photoNum, setPhotoNum] = useState(0);
  const [picTime, setPictime] = useState(10);
  const [timer, setTimer] = useState({
    minute: 0,
    second: 0,
    waitingMinute: 0,
    waitingSecond: 0,
  });
  const [meetingOrder, setMeetingOrder] = useState(-1); // 이게 바뀌었을 때 미팅 순서가 넘어감
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);

  // 연결상태 변경시 콘솔에 출력
  peerService.peer.onconnectionstatechange = () => {
  };

  peerService.peer.onconnectionstatechange = (event) => {
    switch (peerService.peer.connectionState) {
      case 'connecting':
        // 연결이 수립 중인 경우의 로직
        break;
      case 'connected':
        // 연결이 성공적으로 수립된 경우의 로직
        break;
      case 'disconnected':
        // 데이터 흐름은 중단된 상태이지만 연결은 살아있는 경우의 로직
        break;
      case 'failed':
        // 연결이 실패한 경우의 로직
        break;
      case 'closed':
        // 연결이 완전히 종료된 경우의 로직
        break;
    }
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

    // 원격 미디어 스트림 확인
    setRemoteStream(peerService.peer.getRemoteStreams()[0]);

    // 원격 미디어 스트림이 있을 경우, 원격 비디오를 표시하기 위해 remoteStream을 연결합니다.
    if (remoteStream) {
      remoteVideoRef.current!.srcObject = remoteStream;
    }
  };

  // 연예인한테 오퍼 받았을 때 답장 보내는 함수
  // getAnswer--------------------------------------------------
  const getAnswer = useCallback(
    async (ans) => {
      const ansData = {
        type: 'ans',
        ans: ans,
        time: videoData.meetingTime,
      };
      socket.send(JSON.stringify(ansData));
    },
    [socket]
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserVideo(uuid);
      const extractedMemberNos = data.meetingMembers.map(
        (member) => member.memberNo
      );
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
            `${import.meta.env.VITE_WEBSOCKET_URL}${
              videoData.meetingMembers[meetingOrder].roomId
            }`
          );
          setSocket(newSocket); // 새로운 WebSocket 인스턴스를 상태로 업데이트
        }
      };

      connectWebSocket();

      let adjustedMeetingTime = videoData.meetingTime;

      if (videoData.photoNum !== null) {
        adjustedMeetingTime -= videoData.photoNum * 10;
      }

      // 분과 초 초기 설정
      setTimer((prevTimer) => ({
        ...prevTimer,
        minute: Math.floor(adjustedMeetingTime / 60),
        second: adjustedMeetingTime % 60,
        waitingMinute: Math.floor(videoData.waitingTime / 60),
        waitingSecond: videoData.waitingTime % 60,
      }));
      // 촬영 컷 수 설정
      setPhotoNum(videoData.photoNum);
    }

    if (videoData && meetingOrder === videoData.meetingMembers.length) {
      navigate(`/remind/${uuid}`);
    }
  }, [videoData, meetingOrder]);

  useEffect(() => {
    if (!socket) {
      return; // socket이 초기화되지 않은 경우 처리
    }

    socket.onopen = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      stream.getTracks().forEach((track) => {
        peerService.peer.addTrack(track, stream);
      });
      // 로컬 미디어 스트림 확인

      // 원격 미디어 스트림 확인
      setMyStream(stream);

      // const data = {
      //   type: 'join',
      // };
      // const dataString = JSON.stringify(data);
      const offer = await peerService.getOffer();
      // socket.send(dataString); // 서버로 들어왔다는 메시지 'join' 전송
      socket.send(JSON.stringify(offer)); // 서버로 들어왔다는 메시지 'join' 전송

      socket.onmessage = async (event) => {
        const receivedData = JSON.parse(event.data);
        if (receivedData.type === 'answer') {
          peerService.setRemoteDescription(receivedData);
          // 상대 오퍼를 받았으면 answer 를 생성
          // if (peerService.peer) {
          //   // 상대 오퍼를 받았으면 answer 를 생성
          //   const ans = await peerService.getAnswer(receivedData.offer);
          //   getAnswer(ans);
          // }
        }
        if (receivedData.type === 'candidate') {

          const candidateObject = new RTCIceCandidate(receivedData.candidate);
          peerService.peer
            .addIceCandidate(candidateObject)
            .then(() => {
              setRemoteStream(peerService.peer.getRemoteStreams()[0]);
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////// 미팅 타이머 설정 코드 //////////////////////////
  const tickWaiting = () => {

    // 초 줄여주는 로직
    if (timer.waitingSecond > 0) {
      setTimer((prevTimer) => ({
        ...prevTimer,
        waitingSecond: prevTimer.waitingSecond - 1,
      }));
    }

    if (timer.waitingSecond === 0) {
      if (timer.waitingMinute > 0) {
        setTimeout(
          () =>
            setTimer((prevTimer) => ({
              ...prevTimer,
              waitingMinute: prevTimer.waitingMinute - 1,
              waitingSecond: 59,
            })),
          1000
        );
      }
    }
  };

  useEffect(() => {
    if (timer.waitingMinute === 0 && timer.waitingSecond === 0) {
      setMeetingOrder(meetingOrder + 1);
      socket?.close();
      setRemoteStream(null);
      peerService.reset();
    }
  }, [timer.waitingMinute, timer.waitingSecond]);

  // 타이머 함수
  const tick = () => {
    // 초 줄여주는 로직
    if (timer.second > 0) {
      setTimer((prevTimer) => ({
        ...prevTimer,
        second: prevTimer.second - 1,
      }));
    }
    // if (timer.second === 0 && timer.minute > 0) {
    //   setTimer((prevTimer) => ({
    //     ...prevTimer,
    //     minute: prevTimer.minute - 1,
    //     second: 59,
    //   }));
    // }
  };

  /**
   * 사진 찍고(isPhoto -> false됨) 아직 찍을 사진이 남은 경우
   */
  useEffect(() => {
    if (
      timer.second === 0 &&
      timer.minute === 0 &&
      !isPhotoTaken &&
      photoNum > 0
    ) {
      setIsPhotoTaken(true);
      setPhotoNum(photoNum - 1);
    } else if (
      timer.second === 0 &&
      timer.minute === 0 &&
      !isPhotoTaken &&
      photoNum === 0
    ) {
      const intervalId = setInterval(() => {
        // if (screenshotCount == 0) {
        tickWaiting();
        // }
      }, 1000); // 1초마다 실행
      return () => {
        clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
      };
    }
  }, [isPhotoTaken, photoNum, timer]);

  // 역할 :
  useEffect(() => {
    // 상단 타이머의 카운트 다운을 수행
    if (timer.second === 0 && timer.minute > 0) {
      setTimeout(
        () =>
          setTimer((prevTimer) => ({
            ...prevTimer,
            minute: prevTimer.minute - 1,
            second: 59,
          })),
        1000
      );
      // 폴라로이드 촬영을 수행한다.
    } else if (
      videoData &&
      timer.second == 0 &&
      timer.minute == 0 &&
      photoNum != 0
    ) {
      // 미팅 시간이 끝나고 폴라로이드 촬영이 있는 경우
      let screenshotCount = photoNum;
      setIsPhotoTaken(true);

      // const intervalPhoto = setInterval(() => {
      //   // 포토 타임이 있을 경우
      //   if(screenshotCount===0){
      //     clearInterval(intervalPhoto);
      //   }
      //   launchPhotoSystem();
      // }, 10000);

      // const intervalId = setInterval(() => {
      //   if (screenshotCount == 0) {
      //     tickWaiting();
      //   }
      // }, 1000); // 1초마다 실행

      // return () => {
      //   clearInterval(intervalPhoto); // 컴포넌트 언마운트 시 interval 정리
      //   // clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
      // };
    } else if (
      videoData &&
      timer.second == 0 &&
      timer.minute == 0 &&
      photoNum == 0
    ) {
    }
  }, [timer.second, timer.minute, photoNum]);

  useEffect(() => {
    if (peerService.peer) {
      const intervalId = setInterval(() => {
        if (timer.second > 0) {
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
    if (containerRef.current) {
      const containerElement = containerRef.current;
      const canvas = await html2canvas(containerElement);
      // const videoContainer = document.getElementById('video-container');
      // const canvas = await html2canvas(videoContainer);

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
        }
        const response = await postPicture(formData);
      };

      takePhoto();
      setIsPhotoTaken(false);
      if (photoNum === 0) {
        const intervalId = setInterval(() => {
          // if (screenshotCount == 0) {
          tickWaiting();
          if (timer.second === 0) {
            clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
          }
          // }
        }, 1000); // 1초마다 실행
      }
    }
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
      {socket && videoData && (
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
          participantsData={videoData.meetingMembers}
          meetingIdx={meetingOrder}
        />
      )}
      <div className="flex flex-row w-screen h-full justify-center">
        {videoData && (
          <NotepadComponent
            videoData={videoData}
            initialMeetingOrder={meetingOrder}
          />
        )}
        <div id="video-container" className="flex w-full" ref={containerRef}>
          {myStream && (
            <div className="text-center basis-1/2">
              <span className="form-title">내 영상</span>
              <ReactPlayer
                playing
                // muted
                height="full"
                width="full"
                url={myStream}
              />
            </div>
          )}
          {videoData && isPhotoTaken && (
            <PhotoTimer onPhotoTaken={takeScreenshotAndSend} />
          )}
          {remoteStream && (
            <div className="text-center basis-1/2">
              <span className="form-title">연예인 영상</span>
              <ReactPlayer
                key={meetingOrder}
                playing
                // muted
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
