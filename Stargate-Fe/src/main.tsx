import React from 'react';
import { RecoilRoot } from 'recoil';
import './index.css';
import './App.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './pages/auth/SignIn.tsx';
import SignUp from './pages/auth/SignUp.tsx';
import IdInquiry from './pages/auth/Idinquiry.tsx';
import PwInquiry from './pages/auth/PwInquiry.tsx';
import PwReset from './pages/auth/PwReset.tsx';
import Board from './pages/user/board/UserBoard.tsx';
import MyPage from './pages/user/board/MyPage.tsx';
import Remind from './pages/user/board/Remind.tsx';
import Ready from './pages/user/video/ReadyRoom.tsx';
import Video from './pages/user/video/UserVideo.jsx';
import StarVideo from './pages/star/StarVideo.tsx';
import AdminSignUp from './pages/admin/signUp/AdminSignUp.tsx';
import AdminBoard from './pages/admin/board/AdminBoard.tsx';
import AdminManagement from './pages/admin/board/AdminManagement.tsx';
import AdminMyPage from './pages/admin/board/AdminMyPage.tsx';
import AdminEventCreate from './pages/admin/event/AdminEventCreate.tsx';
import AdminEventDetail from './pages/admin/event/AdminEventDetail.tsx';
import AdminMonitoring from './pages/admin/event/AdminMonitoring.tsx';
// import { SocketProvider } from '@/context/SocketProvider.tsx';

const router = createBrowserRouter([
  { path: '/', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/idinquiry', element: <IdInquiry /> },
  { path: '/pwinquiry', element: <PwInquiry /> },
  { path: '/pwreset', element: <PwReset /> },
  { path: '/board', element: <Board /> },
  { path: '/mypage', element: <MyPage /> },
  { path: '/remind', element: <Remind /> },
  { path: '/ready', element: <Ready /> },
  { path: '/video', element: <Video /> },

  { path: '/admin/signup', element: <AdminSignUp /> },
  { path: '/admin/board', element: <AdminBoard /> },
  { path: '/admin/management', element: <AdminManagement /> },
  { path: '/admin/myPage', element: <AdminMyPage /> },
  { path: '/Admin/eventcreate', element: <AdminEventCreate /> },
  { path: '/admin/eventdetail', element: <AdminEventDetail /> },
  { path: '/admin/adminmonitoring', element: <AdminMonitoring /> },

  { path: '/star/video', element: <StarVideo /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      {/* <SocketProvider socketURL="wss://i9a406.p.ssafy.io:8080/rtc/asdf.12"> */}
      <RouterProvider router={router} />
      {/* </SocketProvider> */}
    </RecoilRoot>
  </React.StrictMode>
);
