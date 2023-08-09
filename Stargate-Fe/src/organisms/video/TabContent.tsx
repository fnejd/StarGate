import React from 'react';
import BtnWhite from '@/atoms/common/BtnWhite';

interface Tab0Props {
  readyData: MeetingData;
  handleConfirm: () => void;
}

const Tab0 = ({ readyData, handleConfirm }: Tab0Props) => {
  return (
    <div>
      {readyData.notice}
      <BtnWhite onClick={handleConfirm} text="확인"></BtnWhite>
    </div>
  );
};

const Tab1 = ({ readyData, handleConfirm }: Tab0Props) => {
  return (
    <div>
      탭1
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

const Tab5 = ({ readyData, handleConfirm }: Tab0Props) => {
  return (
    <div>
      탭5
      <BtnWhite text="남은 시간"></BtnWhite>
    </div>
  );
};

export { Tab0, Tab1, Tab2, Tab3, Tab4, Tab5 };
