import React from 'react';

const Remind = () => {
  return <div>리마인드</div>;
};

export default Remind;
import { useState, useEffect } from 'react';
import RemindDetail from '@/organisms/remind/RemindDetail';
import RemindTitle from '@/organisms/remind/RemindTitle';
import { fetchRemindData } from '@/services/userBoardService';
import { MeetingMember } from '@/types/board/type';
import { useRecoilState } from 'recoil';
import { nameShouldFetch } from '@/recoil/myPageState';
import BoardHeader from '@/organisms/board/BoardHeader';

interface MeetingData {
  uuid: string;
  name: string;
  startDate: string;
  groupNo: number;
  groupName: string;
  meetingMembers: MeetingMember[];
}

/**
 * @todo => 처음으로 button 만들기
 * @todo => letter값이 null이여서 주석처리, 추후 확인필요
 */

const Remind = () => {
  const [data, setData] = useState<MeetingData>();
  const [loading, setLoading] = useState(true);
  const [nameFetch, setNameFetch] = useRecoilState(nameShouldFetch);

  useEffect(() => {
    const fetchRemind = async () => {
      const fetchedData = await fetchRemindData(location.pathname);
      if (fetchedData) {
        setData(fetchedData);
        console.log('데이터는', fetchedData);
        setNameFetch(true);
      }
      setLoading(false);
      console.log('로딩완료', location);
    };
    fetchRemind();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <BoardHeader isAdmin={false} title="R E M I N D"></BoardHeader>
      {data && (
        <div className="flex flex-grow mx-10">
          <RemindTitle
            name={data.name}
            startDate={data.startDate}
            groupName={data.groupName}
          />
          <RemindDetail meetingMembers={data.meetingMembers} />
        </div>
      )}
    </div>
  );
};

export default Remind;
