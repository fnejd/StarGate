import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import BtnWhite from '@/atoms/common/BtnWhite';
import AdminToggle from '@/atoms/common/AdminToggle';
import { loginApi } from '@/services/authService';
import { splitVendorChunkPlugin } from 'vite';

interface TabProps {
  readyData: MeetingData;
}

interface Tab2Props {
  readyData: MeetingData;
  setReadyData: React.Dispatch<React.SetStateAction<MeetingData | null>>,
}

type MeetingMember = {
  memberNo: number;
  name: string;
  orderNum: number;
  roomId: string;
  isPolaroidEnable: boolean;
  postitContents: string;
};

type MeetingData = {
  meetingMembers: MeetingMember[];
};

const navigateVideoRoom = () => {};

const Tab0 = ({ readyData }: TabProps) => {
  return (
    <div className='w-5/6 h-5/6 mx-auto'>
      {readyData.notice}
    </div>
  );
};

const Tab1 = ({ readyData }: TabProps) => {
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

      const WIDTH: number = 300
      const HEIGHT: number = 70
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
        canvasCtx.fillStyle = 'rgb(240, 240, 240)'
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
      
        // Restore the canvas state
        canvasCtx.restore();
      }

      drawGraph();
    }
  }, [audioContext, stream]);

  return (
    <div className="w-5/6 h-5/6 flex items-center justify-center mx-auto">
      <div className="w-5/6 h-5/6 mx-auto flex flex-col items-center">
        {stream && (
          <ReactPlayer playing muted height="4/6" width="5/6" url={stream} />
        )}
        <canvas id="audio" width="250" height="80" className='rounded-md mx-auto'></canvas>
      </div>
    </div>
  );
};

const Tab2 = ({ readyData, setReadyData }: Tab2Props) => {
  const [memberInfo, setMemberInfo] = useState<meetingMembers[]>(readyData.meetingMembers);

  const handleTogglePhotoTime = (memberIndex: number) => {
    setMemberInfo((prevMemberInfo) => {
      const updatedMemberInfo = [...prevMemberInfo];
      updatedMemberInfo[memberIndex].isPolaroidEnable = !updatedMemberInfo[memberIndex].isPolaroidEnable;
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
  }, [memberInfo])

  console.log('멤버 폴라로이드 정보', memberInfo)
  console.log('멤버정보', readyData.meetingMembers)
  return (
    <div className="w-5/6 h-5/6 mx-auto">
      <div className='text-18 font-semibold text-center flex justify-between mt-6 mb-4 mx-auto'>
        <span>멤버 이름</span>
        <span>폴라로이드 촬영 여부</span>
      </div>
      {memberInfo && memberInfo.map((member, index) => (
        <div key={index} className='flex justify-between my-8 mx-auto p-4'>
          <div className='text-18'>{member.name}</div>
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
  const [memberInfo, setMemberInfo] = useState<meetingMembers[]>(readyData.meetingMembers);
  const [postitValue, setPostitValue] = useState('');

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
  }, [memberInfo])

  console.log('포스트잇 업뎃', memberInfo)

  return (
    <>
      <div className="bg-postityellow w-4/6 h-380 p-3 mx-auto rounded-sm drop-shadow-lg border-none outline-none mt-2">
        {memberInfo[memberIndex] && (
          <div className='mt-2 font-semibold p-2'>
            To. {memberInfo[memberIndex].name}
            <div>
              <textarea className="bg-postityellow resize-none w-400 h-250 outline-none p-2"
                value={postitValue}
                onChange={handlePostitChange}>
              </textarea>
            </div>
          </div>
        )}
        <div className='flex justify-between cursor-pointer m-2 text-gray-500'>
          <span className="material-symbols-rounded text-32"  onClick={handlePrevMember}>
            chevron_left
          </span>
          <span className="material-symbols-rounded text-32" onClick={handleNextMember}>
            chevron_right
          </span>
        </div>
      </div>
    </>
  );
};

const Tab4 = ({ readyData }: TabProps) => {
  const [memoValue, setMemoValue] = useState('');

  const handleMemoChange = (event) => {
    const newMemoValue = event.target.value;
    setMemoValue(newMemoValue);
  }


  return (
    <div className="bg-postityellow w-4/6 h-380 p-3 mx-auto rounded-sm drop-shadow-lg border-none outline-none mt-2">
          <div className='mt-2 font-semibold p-2'>
            <div>
              <textarea className="bg-postityellow resize-none w-400 h-250 outline-none p-2"
                value={memoValue}
                onChange={handleMemoChange}>
              </textarea>
            </div>
          </div>
    </div>
  );
};

const Tab5 = () => {
  return (
    <div className="w-5/6 h-5/6 mx-auto">
      탭5
      <BtnWhite onClick={navigateVideoRoom} text="남은 시간"></BtnWhite>
    </div>
  );
};

export { Tab0, Tab1, Tab2, Tab3, Tab4, Tab5 };
