import { useState, useEffect } from 'react';
import RemindDetail from '@/organisms/remind/RemindDetail';
import RemindTitle from '@/organisms/remind/RemindTitle';
import { fetchRemindData } from '@/services/userBoardService';
import { ImageFileInfo } from '@/types/board/type';

interface Polaroid {
  no: number;
  imageFileInfo: ImageFileInfo;
}

interface FanLetter {
  no: number;
  contents: string;
  createDate: string;
  editDate: string;
}

interface MeetingMember {
  memberNo: number;
  name: string;
  polaroids: Polaroid[];
  letter: FanLetter;
}

interface MeetingData {
  uuid: string;
  name: string;
  startDate: string;
  groupNo: number;
  groupName: string;
  meetingMembers: MeetingMember[];
}

interface locationData {
  location: string;
}

const Remind = () => {
  const [data, setData] = useState<MeetingData>();
  const [loading, setLoading] = useState(true);

  /**
   * @todo => URLSearchParams 사용해서 path값 가져와서 넣어주기
   */
  
  useEffect(() => {
    const fetchRemind = async (state : locationData) => {
      const fetchedData = await fetchRemindData(location);
      if (fetchedData) {
        setData(fetchedData);
        console.log(fetchedData);
      }
      setLoading(false);
      console.log('로딩완료');
    };
    fetchRemind(location);
  }, []);

  return (
    <div>
      <RemindDetail />
      {/* <RemindTitle /> */}
    </div>
  );
};

export default Remind;
