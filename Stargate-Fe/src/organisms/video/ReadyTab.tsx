import React, { useEffect, useState } from 'react';
import { Tab0, Tab1, Tab2, Tab3, Tab4, Tab5 } from './TabContent';

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

  // 탭 콘텐트에서 확인을 누르면... 위에있는 스테이트랑 액티브 탭이 바뀜... 그럼 함수 하나보내주는게 낫지않나?
  const tabContent: Record<number, React.ReactNode> = {
    0: <Tab0 readyData={readyData} handleConfirm={() => handleConfirm(1)} />,
    1: <Tab1 readyData={readyData} handleConfirm={() => handleConfirm(2)} />,
    2: <Tab2 readyData={readyData} handleConfirm={() => handleConfirm(3)} />,
    3: <Tab3 readyData={readyData} handleConfirm={() => handleConfirm(4)} />,
    4: <Tab4 readyData={readyData} handleConfirm={() => handleConfirm(5)} />,
    5: (
      <Tab5
        readyData={readyData}
        setTabState={setTabState}
        tabState={tabState}
      />
    ),
  };
  const tabList = [
    '공지사항',
    '카메라 및 마이크 테스트',
    '폴라로이드',
    '전달할 포스트잇',
    '내가 볼 메모장',
    '입장 대기존',
  ];

  // 클릭된 인덱스 이전의 탭들을 모두 false로 설정하는 함수
  const handleResetTabs = (tabIndex: number) => {
    setTabState((prevTabState) =>
      prevTabState.map((state, index) => (index < tabIndex ? true : false))
    );
  };

  // 탭을 클릭했을 때 활성화된 탭 번호가 바뀌고
  // 클릭된 탭 이후의 탭들은 모두 비활성화 설정하는 함수
  const handleTabClick = (clickedIndex: number) => {
    setActiveTab(clickedIndex);
    // handleResetTabs(clickedIndex);
  };

  // 탭 확인 버튼 함수
  const handleConfirm = (tabIndex: number) => {
    setActiveTab(tabIndex);
    handleResetTabs(tabIndex);
  };

  console.log('탭 상태', tabState);
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
