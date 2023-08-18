import React from 'react';
import BoardHeaderNav from '../../atoms/board/BoardHeaderNav';
import HeaderTitle from '../../atoms/common/HeaderTitle';

interface HeaderProps {
  isAdmin: boolean;
  title?: string;
}

const BoardHeader = ({ isAdmin, title = 'D A S H B O A R D' }: HeaderProps) => {
  return (
    <div className="w-full">
      <BoardHeaderNav isAdmin={isAdmin} />
      <HeaderTitle>{title}</HeaderTitle>
    </div>
  );
};

export default BoardHeader;
