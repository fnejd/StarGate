import { useState, useEffect } from 'react';
import RemindDetail from '@/organisms/remind/RemindDetail';
import RemindTitle from '@/organisms/remind/RemindTitle';
import { fetchRemindData } from '@/services/userBoardService';
import { MeetingMember } from '@/types/board/type';
import { useRecoilState } from 'recoil';
import { nameShouldFetch } from '@/recoil/myPageState';
import BoardHeader from '@/organisms/board/BoardHeader';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';

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
 */

const Remind = () => {
  const scrollRef = useHorizontalScroll();
  const [data, setData] = useState<MeetingData>();
  const [loading, setLoading] = useState(true);
  const [nameFetch, setNameFetch] = useRecoilState(nameShouldFetch);

  useEffect(() => {
    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const uuid = parts[parts.length - 1];
    console.log(uuid);
    const fetchRemind = async () => {
      const fetchedData = await fetchRemindData(uuid);
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
    <div
      className="flex flex-col h-screen overflow-x-auto w-xl"
      ref={scrollRef}
    >
      <BoardHeader isAdmin={false} title="R  E  M  I  N  D"></BoardHeader>
      {data && (
        <div className="flex flex-grow mx-10 scroll-container min-w-max">
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
