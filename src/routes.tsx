import {Navigate} from 'react-router-dom';
import Login from './main/components/common/Login';
import Register from './main/components/common/Register';
import MainLayout from './main/layout/MainLayout';
import LandingPage from './main/components/common/landingPage/LandingPage';
import DashboardLayout from './main/layout/DashboardLayout';
import AttentionVerifyAccount from './main/components/common/attentionPage/AttentionVerifyAccount';
import VerifyAccount from './main/components/common/VerifyAccount';
import AttentionVerifySuccessful from './main/components/common/attentionPage/AttentionVerifySuccessful';
import Home from './main/screens/client/Home';
import ManageMovies from './main/screens/admin/manage_movies/ManageMovies';
import CreateMovie from './main/screens/admin/manage_movies/CreateMovie';
import SelectMovies from './main/screens/branch/select_movies/SelectMovies';

const routes = [
  {
    path: '/client',
    element: <DashboardLayout />,
    children: [
      {path: 'home', element: <Home />},
      {path: 'tickets', element: <Home />},
      {path: 'profile', element: <Home />},
      {path: '404', element: <>404</>},
      {path: '', element: <Navigate to="/404" />},
      {path: '*', element: <Navigate to="/404" />},
    ],
  },
  {
    path: '/admin',
    element: <DashboardLayout />,
    children: [
      {path: 'manage-user', element: <ManageMovies />},
      {path: 'manage-branch', element: <ManageMovies />},
      {path: 'movies', element: <ManageMovies />},
      {path: 'movies/create', element: <CreateMovie />},
      {path: 'categories', element: <ManageMovies />},
      {path: 'profile', element: <ManageMovies />},
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
      {path: 'movies', element: <SelectMovies />},
      {path: 'public-movies', element: <Login />},
      {path: 'profile', element: <Login />},
      {path: '404', element: <>404</>},
      {path: '', element: <Navigate to="/404" />},
      {path: '*', element: <Navigate to="/404" />},
    ],
  },
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
];

export default routes;
