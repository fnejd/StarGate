import React, { useEffect, useState } from 'react';
import { Tab0, Tab1, Tab2, Tab3, Tab4, Tab5 } from './TabContent';

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

interface RedayDataProps {
  readyData: MeetingData;
}

const ReadyTab = ({ readyData }: RedayDataProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabState, setTabState] = useState<Boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const tabContent: Record<number, React.ReactNode> = {
    0: <Tab0 />,
    1: <Tab1 />,
    2: <Tab2 />,
    3: <Tab3 />,
    4: <Tab4 />,
    5: <Tab5 />,
  };
  const tabList = [
    '공지사항',
    '카메라 및 마이크 테스트',
    '폴라로이드',
    '전달할 포스트잇',
    '내가 볼 메모장',
    '입장 대기존',
  ];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  console.log('활성화된 탭', activeTab);
  console.log('레디 데이터', readyData);
  return (
    readyData && (
      <div className="mx-auto">
        <div className="font-medium text-white font-suit text-40 m-4 text-center">
          {readyData.name}
        </div>
        <div className="flex flex-col flex-wrap w-l h-550 bg-white rounded-md">
          <div className="flex flex-col w-1/4">
            {tabList.map((tab, index) => (
              <div
                className={`flex items-center h-200 cursor-pointer ml-2 my-2 ${
                  tabState[index] ? 'text-mainblue' : 'text-gray-500'
                }`}
                key={index}
                onClick={() => handleTabClick(index)}
              >
                {/* 현재 상태가 true면 무조건 메인블루
              현재 상태가 false지만 현재 액티브 되어있으면 투명도 있는 블루
              현재 상태가 false 이면 무조건 그레이

              그리고 액티브된 숫자보다 큰 숫자들은 무조건 상태 false */}
                <span
                  className={`material-icons text-center ${
                    tabState[index] && activeTab === index
                      ? 'bg-opacity-50'
                      : ''
                  }`}
                >
                  check_circle
                </span>
                <div className="text-black p-4">{tab}</div>
              </div>
            ))}
          </div>
          <div className="my-auto w-4/6 h-500 text-black p-4 border border-black">
            {tabContent[activeTab]}
          </div>
        </div>
      </div>
    )
  );
};

export default ReadyTab;
