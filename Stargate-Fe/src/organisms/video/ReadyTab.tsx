import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tab0, Tab1, Tab2, Tab3, Tab4, Tab5 } from './TabContent';
import BtnWhite from '@/atoms/common/BtnWhite';
import { postPolraroidOption } from '@/services/userVideo';

interface RedayDataProps {
  readyData: MeetingData;
  setReadyData: React.Dispatch<React.SetStateAction<MeetingData | null>>
}

const ReadyTab = ({ readyData, setReadyData }: RedayDataProps) => {
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
    2: <Tab2 readyData={readyData} handleConfirm={() => handleConfirm(3)} setReadyData={setReadyData}/>,
    3: <Tab3 readyData={readyData} handleConfirm={() => handleConfirm(4)} setReadyData={setReadyData}/>,
    4: <Tab4 readyData={readyData} handleConfirm={() => handleConfirm(5)} />,
    5: <Tab5 readyData={readyData} />,
  };
  const tabList = [
    '공지사항',
    '카메라 및 마이크 테스트',
    '폴라로이드',
    '전달할 포스트잇',
    '내가 볼 메모장',
    '입장 대기존',
  ];
  const uuid: string = useParams().uuid;

  console.log('컴포넌트상에서 레디 데이터', readyData)


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
  const handleConfirm = async (tabIndex: number) => {
    setActiveTab(tabIndex + 1);
    handleResetTabs(tabIndex + 1);
    // 폴라로이드 전송
    if (tabIndex == 2) {
      const response = await postPolraroidOption(uuid, readyData.meetingMembers)
      console.log('폴라로이드 전송###', response)
    }
    if (tabIndex == 3) {
      const response = await postNotePad(uuid, readyData.meetingMembers)
      console.log('포스트잇 전송###', response)
    }
  };

  console.log('탭 상태', tabState);
  console.log('활성화된 탭', activeTab);
  console.log('레디 데이터', readyData);

  {/* 현재 상태가 true면 무조건 메인블루
  현재 상태가 false지만 현재 액티브 되어있으면 투명도 있는 블루
  현재 상태가 false 이면 무조건 그레이

  그리고 액티브된 숫자보다 큰 숫자들은 무조건 상태 false */}
  return (
    readyData && (
      <div className="mx-auto">
        <div className="font-medium text-white font-suit text-40 m-4 text-center">
          {readyData.name}
        </div>
        <div className="flex flex-col flex-wrap w-l h-550 bg-white rounded-md">
          <div className="flex flex-col w-1/4 mt-2">
            {tabList.map((tab, index) => (
              <div
                className={`flex items-center h-200 my-2 cursor-pointer rounded-tr-lg rounded-br-lg ${
                  tabState[index] ? 'text-mainblue' : 'text-gray-500'
                } ${activeTab === index ? 'bg-mainblue bg-opacity-20' : ''}`}
                key={index}
                onClick={() => handleTabClick(index)}
              >

                <span
                  className={`material-icons text-center ${
                    activeTab === index ? 'text-white' : ''
                  }`}
                >
                  check_circle
                </span>
                <div className="text-black p-4">{tab}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap my-auto w-4/6 h-500 text-black p-4 border border-black relative">
            {tabContent[activeTab]}
            <div className='z-10 absolute bottom-5 right-5'>
            <BtnWhite onClick={() => handleConfirm(activeTab)} text="확인"></BtnWhite>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ReadyTab;
