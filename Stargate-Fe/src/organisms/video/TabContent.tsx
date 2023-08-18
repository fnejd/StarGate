import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import BtnRed from '@/atoms/common/BtnRed';
import BtnWhite from '@/atoms/common/BtnWhite';
import AdminToggle from '@/atoms/common/AdminToggle';
import { loginApi } from '@/services/authService';
import { splitVendorChunkPlugin } from 'vite';
import {
  MeetingData,
  MeetingFUser,
  MeetingMember,
  ImageFileInfo,
} from '@/types/video/ready';

interface TabProps {
  readyData: MeetingData;
}

interface Tab2Props {
  readyData: ReadyData;
  setReadyData: React.Dispatch<React.SetStateAction<MeetingData | null>>;
}

const navigateVideoRoom = () => {};

const Tab0 = ({ readyData }: TabProps) => {
  return <div className="w-5/6 mx-auto h-5/6">{readyData.notice}</div>;
};

const Tab1 = ({
  readyData,
  mediaActive,
}: TabProps & {
  mediaActive: boolean;
}) => {
  const [stream, setStream] = useState(null);
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    async function getMediaStream() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setStream(mediaStream);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    }

    getMediaStream();
  }, []);

  useEffect(() => {
    if (stream) {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      const WIDTH: number = 300;
      const HEIGHT: number = 70;
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const canvas = document.getElementById('audio');
      console.log(canvas);
      const canvasCtx = canvas.getContext('2d');
      function drawGraph() {
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
        const drawVisual = requestAnimationFrame(drawGraph);
        analyser.getByteFrequencyData(dataArray);
        canvasCtx.fillStyle = 'rgb(240, 240, 240)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'blue';
        canvasCtx.beginPath();
        const sliceWidth = WIDTH / bufferLength;
        let x = 0;

        canvasCtx.save();
        canvasCtx.translate(0, HEIGHT);
        canvasCtx.scale(1, -1);

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = v * (HEIGHT / 2);

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(WIDTH, HEIGHT / 2);
        canvasCtx.stroke();

        canvasCtx.restore();
      }

      drawGraph();
    }
  }, [audioContext, stream]);

  return (
    <div className="flex items-center justify-center w-5/6 mx-auto h-5/6">
      <div className="flex flex-col items-center w-5/6 mx-auto h-5/6">
        {stream && (
          <ReactPlayer
            playing={mediaActive}
            muted
            height="4/6"
            width="5/6"
            url={stream}
          />
        )}
        <div className="m-2"></div>
        <canvas
          id="audio"
          width="250"
          height="80"
          className="mx-auto rounded-md"
        ></canvas>
      </div>
    </div>
  );
};

const Tab2 = ({ readyData, setReadyData }: Tab2Props) => {
  const [memberInfo, setMemberInfo] = useState<meetingMembers[]>(
    readyData.meetingMembers
  );

  const handleTogglePhotoTime = (memberIndex: number) => {
    setMemberInfo((prevMemberInfo) => {
      const updatedMemberInfo = [...prevMemberInfo];
      updatedMemberInfo[memberIndex].isPolaroidEnable =
        !updatedMemberInfo[memberIndex].isPolaroidEnable;
      return updatedMemberInfo;
    });
  };

  useEffect(() => {
    setReadyData((prevReadyData) => {
      return {
        ...prevReadyData,
        meetingMembers: memberInfo,
      };
    });
  }, [memberInfo]);

  console.log('멤버 폴라로이드 정보', memberInfo);
  console.log('멤버정보', readyData.meetingMembers);
  return (
    <div className="w-5/6 mx-auto h-5/6">
      <div className="flex justify-between mx-auto mt-6 mb-4 font-semibold text-center text-18">
        <span>멤버 이름</span>
        <span>폴라로이드 촬영 여부</span>
      </div>
      {memberInfo &&
        memberInfo.map((member, index) => (
          <div key={index} className="flex justify-between p-4 mx-auto my-8">
            <div className="text-18">{member.name}</div>
            <AdminToggle
              photoTime={member.isPolaroidEnable}
              setPhotoTime={() => handleTogglePhotoTime(index)}
            />
          </div>
        ))}
    </div>
  );
};

const Tab3 = ({ readyData, setReadyData }: Tab2Props) => {
  const [memberIndex, setMemberIndex] = useState(0);
  const [memberInfo, setMemberInfo] = useState<meetingMembers[]>(
    readyData.meetingMembers
  );
  const [postitValue, setPostitValue] = useState(
    readyData.meetingMembers[0].postitContents
  );

  const handlePrevMember = () => {
    if (memberIndex > 0) {
      setMemberIndex(memberIndex - 1);
      setPostitValue(memberInfo[memberIndex - 1]?.postitContents || '');
    }
  };

  const handleNextMember = () => {
    if (memberIndex < memberInfo.length - 1) {
      setMemberIndex(memberIndex + 1);
      setPostitValue(memberInfo[memberIndex + 1]?.postitContents || '');
    }
  };

  const handlePostitChange = (event) => {
    const newPostitValue = event.target.value;
    setPostitValue(newPostitValue);

    const updatedMemberInfo = [...memberInfo];
    updatedMemberInfo[memberIndex].postitContents = newPostitValue;
    setMemberInfo(updatedMemberInfo);
  };

  useEffect(() => {
    setReadyData((prevReadyData) => {
      return {
        ...prevReadyData,
        meetingMembers: memberInfo,
      };
    });
  }, [memberInfo]);

  console.log('포스트잇 업뎃', memberInfo);

  return (
    <>
      <div className="w-4/6 p-3 mx-auto mt-2 border-none rounded-sm outline-none bg-postityellow h-380 drop-shadow-lg">
        {memberInfo[memberIndex] && (
          <div className="p-2 mt-2 font-semibold">
            To. {memberInfo[memberIndex].name}
            <div>
              <textarea
                className="p-2 outline-none resize-none bg-postityellow w-400 h-250"
                value={postitValue}
                onChange={handlePostitChange}
              ></textarea>
            </div>
          </div>
        )}
        <div className="flex justify-between m-2 text-gray-500 cursor-pointer">
          <span
            className="material-symbols-rounded text-32"
            onClick={handlePrevMember}
          >
            chevron_left
          </span>
          <span
            className="material-symbols-rounded text-32"
            onClick={handleNextMember}
          >
            chevron_right
          </span>
        </div>
      </div>
    </>
  );
};

const Tab4 = ({ readyData, setReadyData }: Tab2Props) => {
  const [memoValue, setMemoValue] = useState(
    readyData.meetingFUser.memoContents || ''
  );

  const handleMemoChange = (event) => {
    const newMemoValue = event.target.value;
    setMemoValue(newMemoValue);

    setReadyData((prevReadyData) => {
      const updatedMeetingFUser = {
        ...prevReadyData.meetingFUser,
        memoContents: newMemoValue,
      };
      return {
        ...prevReadyData,
        meetingFUser: updatedMeetingFUser,
      };
    });
  };

  console.log('메모 바뀌는', readyData);

  return (
    <div className="w-4/6 p-3 mx-auto mt-2 border-none rounded-sm outline-none bg-memoblue h-380 drop-shadow-lg">
      <div className="p-2 mt-2 font-semibold">
        <div>
          <textarea
            className="p-2 outline-none resize-none bg-memoblue w-400 h-250"
            value={memoValue}
            onChange={handleMemoChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

const Tab5 = ({ readyData }) => {
  const uuid: string = useParams().uuid;
  const navigate = useNavigate();
  const [timer, setTimer] = useState({
    minute: 0,
    second: 0,
  });
  const formattedMinute = timer.minute.toString().padStart(2, '0');
  const formattedSecond = timer.second.toString().padStart(2, '0');

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
  };

  useEffect(() => {
    setTimer((prevTimer) => ({
      ...prevTimer,
      minute: Math.floor(readyData.meetingFUser.remainingTime / 60),
      second: readyData.meetingFUser.remainingTime % 60,
    }));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer.second > 0) {
        console.log('타이머 시작!');
        tick();
      }
    }, 1000); // 1초마다 실행

    return () => {
      clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
    };
  }, [timer]);

  useEffect(() => {
    if (timer.second === 0 && timer.minute > 0) {
      console.log('초가 0이 되어 분이 줄어듦');
      setTimeout(
        () =>
          setTimer((prevTimer) => ({
            ...prevTimer,
            minute: prevTimer.minute - 1,
            second: 59,
          })),
        1000
      );
    }
  }, [timer.second, timer.minute]);

  const navigateVideoRoom = () => {
    if (timer.minute === 0 && timer.second === 0) {
      // 시간이 0일 때만 이동
      navigate(`/video/${uuid}`);
    }
  };

  return (
    <div className="flex items-center justify-center w-5/6 mx-auto text-center h-5/6">
      {timer.minute === 0 && timer.second === 0 ? ( // 시간이 0분 0초인 경우
        <BtnRed
          onClick={navigateVideoRoom}
          text="입장하기" // 버튼 텍스트 변경
        />
      ) : timer.minute === 0 && timer.second <= 10 ? (
        <BtnRed text={`${formattedMinute} : ${formattedSecond}`} />
      ) : (
        <BtnWhite text={`${formattedMinute} : ${formattedSecond}`} />
      )}
    </div>
  );
};

export { Tab0, Tab1, Tab2, Tab3, Tab4, Tab5 };
