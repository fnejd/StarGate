import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReadyTab from '@/organisms/video/ReadyTab';
import { getReady } from '@/services/userVideo';

interface ImageFileInfo {
  filename: string;
  fileUrl: string;
}

interface MeetingFUser {
  email: string;
  orderNum: number;
  name: string;
  remainingTime: number;
  remainingFanNum: number;
  memoContents: string;
}
interface MeetingMember {
  memberNo: number;
  name: string;
  orderNum: number;
  roomId: string;
  isPolaroidEnable: boolean;
  postitContents: string;
}

interface MeetingData {
  uuid: string;
  name: string;
  startDate: string;
  waitingTime: number;
  meetingTime: number;
  notice: string;
  photoNum: number;
  groupNo: number;
  groupName: string;
  imageFileInfo: ImageFileInfo;
  meetingFUsers: MeetingFUser[];
  meetingMembers: MeetingMember[];
}

const ReadyRoom = () => {
  const [readyData, setReadyData] = useState<MeetingData | null>(null); // 대기방 정보 담는 변수
  const uuid: string = useParams().uuid;

  // 1초마다 시간 확인 및 업데이트
  useEffect(() => {
    const fetchReadyData = async () => {
      try {
        const readyData = await getReady(uuid);
        console.log('대기방 데이터', readyData);
        setReadyData(readyData);
        // 여기서 readyData를 사용하거나 처리할 수 있음
      } catch (error) {
        console.error('데이터 가져오기 실패 ', error);
      }
    };

    fetchReadyData(); // async 함수 호출
  }, []);

  return (
    <div>
      <ReadyTab readyData={readyData} />
    </div>
  );
};

export default ReadyRoom;
