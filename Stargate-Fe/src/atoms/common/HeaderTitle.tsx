import React from 'react';

interface HeaderTitleProps {
  children: React.ReactNode;
}

const HeaderTitle = ({ children }: HeaderTitleProps) => {
  return (
    <div className='w-full flex justify-center items-center py-5 text-white'>
      <p className='t2r'>{children}</p>
    </div>
  );
};

export default HeaderTitle;