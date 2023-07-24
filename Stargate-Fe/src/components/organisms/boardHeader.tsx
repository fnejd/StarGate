import React from 'react';
import BoardHeaderNav from '../atoms/BoardHeaderNav';
import BoardHeaderTitle from '../atoms/BoardHeaderTitle';

const BoardHeader = () => {
  return (
    <div>
      <BoardHeaderNav/>
      <BoardHeaderTitle/>
    </div>
  );
};

export default BoardHeader;
