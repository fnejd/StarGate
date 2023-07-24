import React from 'react';
import './index.css';
import './App.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import SignIn from './pages/auth/signIn.tsx';
import SignUp from './pages/auth/signUp.tsx';
import IdInquiry from './pages/auth/idInquiry.tsx';
import PwInquiry from './pages/auth/pwInquiry.tsx';
import PwReset from './pages/auth/pwReset.tsx';
import Board from './pages/user/board/board.tsx';
import MyPage from './pages/user/board/myPage.tsx';
import Remind from './pages/user/board/remind.tsx';
import Ready from './pages/user/video/ready.tsx';
import Video from './pages/user/video/video.tsx';
import StarVideo from './pages/star/starVideo.tsx';
import AdminSignUp from './pages/admin/signUp/adminSignUp.tsx';
import AdminBoard from './pages/admin/board/adminBoard.tsx';
import AdminManagement from './pages/admin/board/adminManagement.tsx';
import AdminMyPage from './pages/admin/board/adminMyPage.tsx';
import AdminEventCreate from './pages/admin/event/adminEventCreate.tsx';
import AdminEventDetail from './pages/admin/event/adminEventDetail.tsx';
import AdminMonitoring from './pages/admin/event/adminMonitoring.tsx';
import './index.css'; // CSS 파일을 import

const router = createBrowserRouter([
  {path: '/', element: <SignIn /> },
  {path: '/signup', element: <SignUp /> },
  {path: '/idinquiry', element: <IdInquiry />},
  {path: '/pwinquiry', element: <PwInquiry />},
  {path: '/pwreset', element: <PwReset />},
  {path: '/board', element: <Board /> },
  {path: '/mypage', element: <MyPage /> }, 
  {path: '/remind', element: <Remind />},
  {path: '/ready', element: <Ready />},
  {path: '/video', element: <Video />},
  
  {path: '/admin/signup', element: <AdminSignUp /> },
  {path: '/admin/board', element: <AdminBoard /> },
  {path: '/admin/management', element: <AdminManagement /> },
  {path: '/admin/myPage', element: <AdminMyPage />},
  {path: '/Admin/eventcreate', element: <AdminEventCreate />},
  {path: '/admin/eventdetail', element: <AdminEventDetail />},
  {path: '/admin/adminmonitoring', element: <AdminMonitoring /> },

  { path: '/star/video', element: <StarVideo /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
