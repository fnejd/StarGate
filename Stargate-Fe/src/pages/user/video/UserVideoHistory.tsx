import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserVideoHistory = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // 일정 시간 후에 다른 경로로 이동
      history.push('/page2');
    }, 5000); // 5초 후에 이동

    return () => {
      clearTimeout(timeoutId); // 컴포넌트 언마운트 시 타이머 해제
    };
  }, [history]);

  return <div>Page 1</div>;
};

const Page2 = () => {
  return <div>Page 2</div>;
};

const App = () => {
  return (
    <div>
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />
    </div>
  );
};

export default UserVideoHistory;
