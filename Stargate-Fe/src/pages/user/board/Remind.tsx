import { useState, useEffect, useRef } from 'react';
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

const Remind = () => {
  const scrollRef = useHorizontalScroll();
  const remindDetailRef = useRef();
  const [data, setData] = useState<MeetingData>();
  const [loading, setLoading] = useState(true);
  const [nameFetch, setNameFetch] = useRecoilState(nameShouldFetch);

  useEffect(() => {
    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const uuid = parts[parts.length - 1];

    const fetchRemind = async () => {
      const fetchedData = await fetchRemindData(uuid);
      if (fetchedData) {
        setData(fetchedData);
        setNameFetch(true);
      }
      setLoading(false);
    };
    fetchRemind();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === remindDetailRef.current) {
          if (entry.isIntersecting) {
            remindTitleRef.current.classList.add('blurred');
          } else {
            remindTitleRef.current.classList.remove('blurred');
          }
        }
      });
    }, options);

    if (remindDetailRef.current) {
      observer.observe(remindDetailRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="flex flex-col w-screen h-screen overflow-x-auto bg-no-repeat bg-cover bg-gradient-to-b from-mainpurple to-mainyellow"
      ref={scrollRef}
    >
      <BoardHeader isAdmin={false} title="R  E  M  I  N  D"></BoardHeader>
      {data && (
        <div className="relative flex flex-grow mx-10 scroll-container min-w-max">
          <RemindTitle
            name={data.name}
            startDate={data.startDate}
            groupName={data.groupName}
            className="absolute inset-0 pointer-events-none backdrop-blur-md"
          />
          <RemindDetail
            ref={remindDetailRef} // 생성한 ref 전달
            meetingMembers={data.meetingMembers}
            remindData={data}
          />
        </div>
      )}
    </div>
  );
};

export default Remind;
