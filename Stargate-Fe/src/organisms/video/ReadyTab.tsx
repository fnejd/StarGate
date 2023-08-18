import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tab0, Tab1, Tab2, Tab3, Tab4, Tab5 } from './TabContent';
import BtnWhite from '@/atoms/common/BtnWhite';
import {
  postPolraroidOption,
  postNotePad,
  postMemo,
} from '@/services/userVideo';
import Swal from 'sweetalert2';

interface RedayDataProps {
  readyData: ReadyData;
  setReadyData: React.Dispatch<React.SetStateAction<ReadyData | null>>;
}

const ReadyTab = ({ readyData, setReadyData }: RedayDataProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [mediaActive, setMediaActive] = useState(true);
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
    1: (
      <Tab1
        readyData={readyData}
        handleConfirm={() => handleConfirm(2)}
        mediaActive={mediaActive} // mediaActive 상태를 Tab1 컴포넌트로 전달
      />
    ),
    2: (
      <Tab2
        readyData={readyData}
        handleConfirm={() => handleConfirm(3)}
        setReadyData={setReadyData}
      />
    ),
    3: (
      <Tab3
        readyData={readyData}
        handleConfirm={() => handleConfirm(4)}
        setReadyData={setReadyData}
      />
    ),
    4: (
      <Tab4
        readyData={readyData}
        handleConfirm={() => handleConfirm(5)}
        setReadyData={setReadyData}
      />
    ),
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

  useEffect(() => {
    if (activeTab !== 1) {
      setMediaActive(false);
    } else if (activeTab === 1) {
      setMediaActive(true);
    }
  }, [activeTab]);

  // 클릭된 인덱스 이전의 탭들을 모두 false로 설정하는 함수
  const handleResetTabs = (tabIndex: number) => {
    setTabState((prevTabState) =>
      prevTabState.map((state, index) => (index < tabIndex ? true : false))
    );
  };

  // 탭을 클릭했을 때 활성화된 탭 번호가 바뀌고
  // 클릭된 탭 이후의 탭들은 모두 비활성화 설정하는 함수
  const handleTabClick = (clickedIndex: number) => {
    if (clickedIndex === 5) {
      const hasFalseStateBeforeTab5 = tabState
        .slice(0, 4)
        .some((state) => !state);
      if (hasFalseStateBeforeTab5) {
        Swal.fire('Warning', '입장 전 위의 필수 절차를 먼저 진행해주세요', 'warning');
        setActiveTab(0);
        return;
      }
    }
    setActiveTab(clickedIndex);
    // handleResetTabs(clickedIndex);
  };

  // 탭 확인 버튼 함수
  const handleConfirm = async (tabIndex: number) => {
    setActiveTab(tabIndex + 1);
    handleResetTabs(tabIndex + 1);
    if (tabIndex == 1) {
      setMediaActive(false);
    }
    // 폴라로이드 전송
    if (tabIndex == 2) {
      const response = await postPolraroidOption(
        uuid,
        readyData.meetingMembers
      );
    }
    if (tabIndex == 3) {
      const postitData = {
        email: readyData.meetingFUser.email,
        uuid: uuid,
        postitDatas: readyData.meetingMembers.map((member) => ({
          memberNo: member.memberNo,
          postitContents: member.postitContents,
        })),
      };

      const response = await postNotePad(postitData);
    }
    if (tabIndex == 4) {
      const noteData = {
        uuid: uuid,
        contents: readyData.meetingFUser.memoContents,
      };

      const response = await postMemo(noteData);

      const hasFalseStateBeforeTab5 = tabState
        .slice(0, 4)
        .some((state) => !state);
      if (hasFalseStateBeforeTab5) {
        Swal.fire('Warning', '입장 전 위의 필수 절차를 먼저 진행해주세요', 'warning');
        setActiveTab(0);
        return;
      }
    }
    if (tabIndex === 5) {
    }
  };

  {
    /* 현재 상태가 true면 무조건 메인블루
  현재 상태가 false지만 현재 액티브 되어있으면 투명도 있는 블루
  현재 상태가 false 이면 무조건 그레이

  그리고 액티브된 숫자보다 큰 숫자들은 무조건 상태 false */
  }
  return (
    readyData && (
      <div className="mx-auto h-5/6 flex flex-col justify-around">
        <div className="font-medium text-white font-suit text-40 text-center">
          {readyData.name}
        </div>
        <div className="flex flex-col flex-wrap w-l h-550 bg-white rounded-md">
          <div className="flex flex-col w-1/4 mt-2">
            {tabList.map((tab, index) => (
              <div
                className={`flex items-center h-1/6 my-2 cursor-pointer rounded-tr-lg rounded-br-lg ${
                  tabState[index] ? 'text-mainblue' : 'text-gray-500'
                } ${activeTab === index ? 'bg-mainblue bg-opacity-20' : ''}`}
                key={index}
                onClick={() => handleTabClick(index)}
              >
                <span
                  className={`material-icons text-center ml-2 ${
                    activeTab === index ? 'text-white' : ''
                  }`}
                >
                  check_circle
                </span>
                <div className="text-black p-4">{tab}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap my-auto w-4/6 h-500 text-black p-4 relative">
            {readyData && tabContent[activeTab]}
            {activeTab !== 5 && (
              <div className="z-10 absolute bottom-5 right-5">
                <BtnWhite
                  onClick={() => handleConfirm(activeTab)}
                  text="확인"
                ></BtnWhite>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ReadyTab;
