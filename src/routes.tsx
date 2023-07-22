import {Navigate} from 'react-router-dom';
import Login from './main/components/common/Login';
import Register from './main/components/common/Register';
import MainLayout from './main/layout/MainLayout';
import LandingPage from './main/components/common/LandingPage';
import DashboardLayout from './main/layout/DashboardLayout';

const routes = [
  {path: '/', element: <LandingPage />},
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {path: 'login', element: <Login />},
      {path: 'register', element: <Register />},
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
