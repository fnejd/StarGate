// 외부모듈 import
import styled from 'styled-components';
import React, { useRef, useEffect, useState, Children } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as SockJS from 'sockjs-client';

// 내부모듈 import
import { instance } from '../../../../api/core/axios';
import GameRoomChoice from './GameRoomChoice';
import { getNicknameCookie } from '../../../../utils/cookies';
import ChatBox from './ChatBox';
import Audio from './Audio';

// GameRoomRTC 컴포넌트를 정의합니다.
function GameRoomRTC() {
  // 컴포넌트 내부에서 사용할 상태값들과 useRef를 정의합니다.
  const myNickName = getNicknameCookie('nickname'); // 현재 사용자의 닉네임을 가져옵니다.
  const navigate = useNavigate(); // React Router의 navigation 기능을 사용합니다.

  const socketRef = useRef(); // WebSocket 연결을 위한 ref를 생성합니다.

  const videoRef = useRef(null); // 비디오 요소를 참조하기 위한 ref를 생성합니다.
  const muteBtn = useRef(null); // 음소거 버튼 요소를 참조하기 위한 ref를 생성합니다.
  const cameraBtn = useRef(null); // 카메라 끄기 버튼 요소를 참조하기 위한 ref를 생성합니다.
  const camerasSelect = useRef(null); // 카메라 선택 셀렉트 요소를 참조하기 위한 ref를 생성합니다.
  const cameraOption = useRef(null); // 카메라 옵션 요소를 참조하기 위한 ref를 생성합니다.
  const param = useParams(); // React Router에서 전달받은 URL 파라미터를 가져옵니다.

  const [users, setUsers] = useState([]); // 사용자 정보 배열과 상태를 생성합니다.

  let pcs = {}; // RTCPeerConnection 객체들을 담을 객체를 생성합니다.
  let muted = false; // 오디오 뮤트 상태를 저장하는 변수를 생성합니다.
  let cameraOff = false; // 카메라 끄기 상태를 저장하는 변수를 생성합니다.
  let stream; // 로컬 스트림을 저장할 변수를 생성합니다.
  let myPeerConnection; // 내 RTCPeerConnection 객체를 저장할 변수를 생성합니다.

  // RTCPeerConnection 객체를 생성하는 함수를 정의합니다.
  function createPeerConnection(socketID, socket, peerConnectionLocalStream) {
    // RTCPeerConnection 객체를 생성하고 설정합니다.
    const peerService = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    });
    
    // RTCPeerConnection 객체를 pcs 객체에 추가합니다.
    const keyName = socketID;
    pcs = { ...pcs, [`${keyName}`]: peerService };

    // icecandidate 이벤트 핸들러를 등록합니다.
    peerService.onicecandidate = (e) => {
      if (e.candidate) {
        console.log('onicecandidate');
        socket.send(
          JSON.stringify({
            type: 'candidate',
            candidate: e.candidate,
            receiver: socketID,
            roomId: param.roomId,
          }),
        );
      }
    };

    peerService.ontrack = (e) => {
      console.log('ontrack success');
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== socketID));
      setUsers((oldUsers) => [
        ...oldUsers,
        {
          id: socketID,
          stream: e.streams[0],
        },
      ]);
    };

    // 로컬 스트림이 존재할 경우 RTCPeerConnection 객체에 추가합니다.
    if (peerConnectionLocalStream) {
      console.log('localstream add');
      peerConnectionLocalStream.getTracks().forEach((track) => {
        peerService.addTrack(track, peerConnectionLocalStream);
      });
    } else {
      console.log('no local stream');
      console.log(peerConnectionLocalStream);
    }

    return peerService;
  }

  // 카메라 끄기 버튼 클릭 시 동작하는 함수를 정의합니다.
  function onClickCameraOffHandler() {
    stream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    if (!cameraOff) {
      cameraBtn.current.innerText = 'OFF';
      cameraOff = !cameraOff;
    } else {
      cameraBtn.current.innerText = 'ON';
      cameraOff = !cameraOff;
    }
  }

  // 음소거 버튼 클릭 시 동작하는 함수를 정의합니다.
  function onClickMuteHandler() {
    console.log('stream:', stream);
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    if (!muted) {
      muteBtn.current.innerText = 'Unmute';
      muted = !muted;
    } else {
      muteBtn.current.innerText = 'Mute';
      muted = !muted;
    }
  }

  // 사용 가능한 카메라 목록을 가져오는 함수를 정의합니다.
  async function getCameras() {
    try {
      // 유저의 장치를 얻어옵니다.
      const devices = await navigator.mediaDevices.enumerateDevices();
      // 얻어온 유저의 장치들에서 카메라 장치만 필터링합니다.
      const cameras = devices.filter((device) => device.kind === 'videoinput');
      // 현재 내가 사용 중인 카메라의 label명을 셀렉트란에 보여주기 위한 과정입니다.
      // 아래의 if문과 이어서 확인해주세요.
      const currentCamera = stream.getVideoTracks()[0];
      cameras.forEach((camera) => {
        cameraOption.current.value = camera.deviceId;
        cameraOption.current.innerText = camera.label;
        if (currentCamera.label === camera.label) {
          cameraOption.current.selected = true;
        }
        camerasSelect.current.appendChild(cameraOption.current);
      });
    } catch (error) {
      console.log(error);
    }
  }

  // 사용자의 카메라를 가져오는 함수를 정의합니다.
  async function getUserMedia(deviceId) {
    const initialConstrains = {
      video: { facingMode: 'user' },
      audio: true,
    };
    const cameraConstrains = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };
    try {
      stream = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstrains : initialConstrains,
      );
      videoRef.current.srcObject = stream;
      if (!deviceId) {
        await getCameras();
      }
    } catch (err) {
      console.log(err);
    }
    return stream;
  }

  // 컴포넌트가 마운트되면 WebSocket 연결을 수행하고, 사용자 미디어를 가져옵니다.
  useEffect(() => {
    // WebSocket 연결을 생성합니다.
    socketRef.current = new SockJS(`http://13.209.84.31:8080/signal`);
    socketRef.current.onopen = () => {
      getUserMedia()
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            console.log(stream);
          }
          stream = stream;
          socketRef.current?.send(
            JSON.stringify({
              type: 'join_room',
              roomId: param.roomId,
            }),
          );
        })
        .catch((error) => {
          console.log(`getUserMedia error: ${error}`);
        });
    };

    // WebSocket 메시지를 처리하는 이벤트 핸들러를 등록합니다.
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data.type);
      switch (data.type) {
        case 'all_users': {
          // 모든 사용자 목록을 받았을 때의 동작을 정의합니다.
          console.log('all_user receive');
          console.log(data.allUsers);
          const { allUsers } = data;
          for (let i = 0; i < allUsers.length; i += 1) {
            console.log(stream);
            createPeerConnection(allUsers[i], socketRef.current, stream);
            console.log(pcs);

            const allUsersEachPc = pcs[`${allUsers[i]}`];
            if (allUsersEachPc) {
              allUsersEachPc
                .createOffer({
                  offerToReceiveAudio: true,
                  offerToReceiveVideo: true,
                })
                .then((offer) => {
                  console.log('create offer success');
                  allUsersEachPc.setLocalDescription(offer);
                  socketRef.current?.send(
                    JSON.stringify({
                      type: 'offer',
                      offer,
                      receiver: allUsers[i],
                      roomId: param.roomId,
                    }),
                  );
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
          break;
        }
        case 'offer': {
          // 오퍼를 받았을 때의 동작을 정의합니다.
          console.log('get offer');
          console.log(data);
          console.log(data.offer);
          createPeerConnection(data.sender, socketRef.current, stream);
          const offerPc = pcs[`${data.sender}`];
          if (offerPc) {
            offerPc.setRemoteDescription(data.offer).then(() => {
              console.log('answer set remote description success');
              offerPc
                .createAnswer({
                  offerToReceiveVideo: true,
                  offerToReceiveAudio: true,
                })
                .then((answer) => {
                  console.log('create answer success');
                  offerPc.setLocalDescription(answer);
                  socketRef.current?.send(
                    JSON.stringify({
                      type: 'answer',
                      answer,
                      receiver: data.sender,
                      roomId: param.roomId,
                    }),
                  );
                })
                .catch((error) => {
                  console.log(error);
                });
            });
          }
          break;
        }
        case 'answer': {
          // 어드벤티를 받았을 때의 동작을 정의합니다.
          console.log('get answer');
          console.log(pcs, data);
          const answerPc = pcs[`${data.sender}`];
          console.log(answerPc.signalingState);
          if (answerPc) {
            console.log(answerPc);
            answerPc.setRemoteDescription(data.answer);
          }
          break;
        }
        case 'candidate': {
          // 캔디데이트를 받았을 때의 동작을 정의합니다.
          console.log('get candidate');
          const candidatePc = pcs[`${data.sender}`];
          console.log(candidatePc.signalingState);
          if (candidatePc) {
            candidatePc.addIceCandidate(data.candidate).then(() => {
              console.log('candidate add success');
              console.log(data.candidate, pcs);
            });
          }
          break;
        }
        case 'leave': {
          // 사용자가 방을 떠났을 때의 동작을 정의합니다.
          console.log('delete', data.sender);
          pcs[`${data.sender}`].close();
          delete pcs[data.sender];
          setUsers((oldUsers) =>
            oldUsers.filter((user) => user.id !== data.sender),
          );
          break;
        }
        default: {
          break;
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 방에서 나가기를 처리하는 함수를 정의합니다.
  const disconnect = () => {
    socketRef.current?.send(
      JSON.stringify({
        type: 'leave',
        roomId: param.roomId,
      }),
    );
  };

  // 방을 나가는 동작을 수행하고, 서버에 방을 나가는 요청을 보내는 함수를 정의합니다.
  const leaveRoom = async () => {
    await disconnect();
    await instance
      .delete(`rooms/${param.roomId}/exit`)
      .then(async (res) => {
        console.log('res', res);
        await navigate('/rooms');
      })
      .catch(async (error) => {
        alert(error.data.message);
        await navigate('/rooms');
      });
  };

  // 카메라 선택 셀렉트 요소의 변경 이벤트 핸들러를 정의합니다.
  async function onInputCameraChange() {
    await getUserMedia(camerasSelect.current.value);
    if (myPeerConnection) {
      const videoTrack = stream.getVideoTracks()[0];
      const videoSender = myPeerConnection
        .getSenders()
        .find((sender) => sender.track.kind === 'video');
      videoSender.replaceTrack(videoTrack);
    }
  }

  return (
    <StGameRoomOuter>
      <StGameRoomHeader>
        {/* 뒤로가기 버튼 */}
        <Link to="/rooms">
          <button>뒤로가기</button>
        </Link>

        {/* 방 나가기 버튼 */}
        <button
          onClick={() => {
            leaveRoom();
          }}
        >
          방나가기
        </button>

        {/* 설정 버튼 */}
        <button>설정</button>
      </StGameRoomHeader>

      {/* 게임 방 선택 컴포넌트 */}
      <GameRoomChoice props={param} />

      <StGameRoomMain>
        <StGameTitleAndUserCards>
          <StTitle>
            <h1>주제</h1>
          </StTitle>

          <StUserCards>
            {/* 현재 사용자 정보 카드 */}
            <StCard>
              Card
              <h4>키워드</h4>
              <span>{myNickName}님</span>
              <div>
                {/* 사용자의 비디오 스트림을 보여주는 video 요소 */}
                <video
                  ref={videoRef}
                  id="myFace"
                  autoPlay
                  playsInline
                  width={200}
                  height={200}
                >
                  비디오
                </video>
                {/* 오디오 뮤트 버튼 */}
                <button ref={muteBtn} onClick={onClickMuteHandler}>
                  mute
                </button>
                {/* 카메라 끄기 버튼 */}
                <button ref={cameraBtn} onClick={onClickCameraOffHandler}>
                  camera OFF
                </button>
                {/* 카메라 선택 셀렉트 요소 */}
                <select ref={camerasSelect} onInput={onInputCameraChange}>
                  <option>기본</option>
                  <option ref={cameraOption} value="device" />
                </select>
              </div>
            </StCard>

            {/* 다른 사용자들의 오디오 정보 카드 */}
            {users.map((user) => {
              return (
                <StCard key={user.id}>
                  <Audio key={user.id} stream={user.stream}>
                    <track kind="captions" />
                  </Audio>
                </StCard>
              );
            })}
          </StUserCards>
        </StGameTitleAndUserCards>

        {/* 타이머 */}
        <StTimer>타이머:남은시간20초</StTimer>

        {/* 채팅방 컴포넌트 */}
        <ChatBox />
      </StGameRoomMain>
    </StGameRoomOuter>
  );
}
