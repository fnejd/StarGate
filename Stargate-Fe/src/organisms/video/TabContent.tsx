import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import BtnWhite from '@/atoms/common/BtnWhite';

interface Tab0Props {
  readyData: MeetingData;
  handleConfirm: () => void;
}

const navigateVideoRoom = () => {};

const Tab0 = ({ readyData, handleConfirm }: Tab0Props) => {
  return (
    <div>
      {readyData.notice}
      <BtnWhite onClick={handleConfirm} text="확인"></BtnWhite>
    </div>
  );
};

const Tab1 = ({ readyData, handleConfirm }: Tab0Props) => {
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

      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const canvas = document.getElementById('audio');
      console.log(canvas);
      const canvasCtx = canvas.getContext('2d');
      function drawGraph() {
        canvasCtx.clearRect(0, 0, 100, 100);
        const drawVisual = requestAnimationFrame(drawGraph);
        analyser.getByteFrequencyData(dataArray);
        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, 100, 100);
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
        canvasCtx.beginPath();
        const sliceWidth = 100 / bufferLength;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = v * (100 / 2);

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }
        canvasCtx.lineTo(100, 100 / 2);
        canvasCtx.stroke();
      }

      drawGraph();
    }
  }, [audioContext, stream]);

  return (
    <div>
      {stream && (
        <ReactPlayer playing muted height="300px" width="400px" url={stream} />
      )}
      <canvas id="audio" width="150" height="150"></canvas>
      <BtnWhite onClick={handleConfirm} text="확인"></BtnWhite>
    </div>
  );
};

const Tab2 = ({ readyData, handleConfirm }: Tab0Props) => {
  return (
    <div>
      탭2
      <BtnWhite onClick={handleConfirm} text="확인"></BtnWhite>
    </div>
  );
};

const Tab3 = ({ readyData, handleConfirm }: Tab0Props) => {
  return (
    <div>
      탭3
      <BtnWhite onClick={handleConfirm} text="확인"></BtnWhite>
    </div>
  );
};

const Tab4 = ({ readyData, handleConfirm }: Tab0Props) => {
  return (
    <div>
      탭4
      <BtnWhite onClick={handleConfirm} text="확인"></BtnWhite>
    </div>
  );
};

const Tab5 = () => {
  return (
    <div>
      탭5
      <BtnWhite onClick={navigateVideoRoom} text="남은 시간"></BtnWhite>
    </div>
  );
};

export { Tab0, Tab1, Tab2, Tab3, Tab4, Tab5 };
