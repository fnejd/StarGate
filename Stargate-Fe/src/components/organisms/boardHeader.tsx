import React from 'react';
import BoardHeaderNav from '../atoms/boardHeaderNav';
import BoardHeaderTitle from '../atoms/boardHeaderTitle';
const boardHeader = () => {
  return (
    <div>
      <BoardHeaderNav></BoardHeaderNav>
      <BoardHeaderTitle></BoardHeaderTitle>
    </div>
  );
};

export default boardHeader;
