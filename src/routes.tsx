import {Navigate} from 'react-router-dom';
import Login from './main/components/common/Login';
import Register from './main/components/common/Register';
import MainLayout from './main/layout/MainLayout';
import LandingPage from './main/components/common/landingPage/LandingPage';
import DashboardLayout from './main/layout/DashboardLayout';
import AttentionVerifyAccount from './main/components/common/attentionPage/AttentionVerifyAccount';
import VerifyAccount from './main/components/common/VerifyAccount';
import AttentionVerifySuccessful from './main/components/common/attentionPage/AttentionVerifySuccessful';

const routes = [
  {path: '/', element: <LandingPage />},
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {path: 'login', element: <Login />},
      {path: 'register', element: <Register />},
      {path: 'verify-account', element: <AttentionVerifyAccount />},
      {
        path: 'verify-account-successful',
        element: <AttentionVerifySuccessful />,
      },
      {path: 'account/verify', element: <VerifyAccount />},
      {path: '404', element: <>404</>},
      {path: '', element: <Navigate to="/404" />},
      {path: '*', element: <Navigate to="/404" />},
    ],
  },
  {
    path: '/client',
    element: <DashboardLayout />,
    children: [
      {path: 'login', element: <Login />},
      {path: 'register', element: <Register />},
      {path: '404', element: <>404</>},
      {path: '', element: <Navigate to="/404" />},
      {path: '*', element: <Navigate to="/404" />},
    ],
  },
  {
    path: '/admin',
    element: <DashboardLayout />,
    children: [
      {path: 'login', element: <Login />},
      {path: 'register', element: <Register />},
      {path: '404', element: <>404</>},
      {path: '', element: <Navigate to="/404" />},
      {path: '*', element: <Navigate to="/404" />},
    ],
  },
  {
    path: '/staff',
    element: <DashboardLayout />,
    children: [
      {path: 'login', element: <Login />},
      {path: 'register', element: <Register />},
      {path: '404', element: <>404</>},
      {path: '', element: <Navigate to="/404" />},
      {path: '*', element: <Navigate to="/404" />},
    ],
  },
  {
    path: '/branch',
    element: <DashboardLayout />,
    children: [
      {path: 'login', element: <Login />},
      {path: 'register', element: <Register />},
      {path: '404', element: <>404</>},
      {path: '', element: <Navigate to="/404" />},
      {path: '*', element: <Navigate to="/404" />},
    ],
  },
];

export default routes;
