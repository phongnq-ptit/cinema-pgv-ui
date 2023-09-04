import {Navigate} from 'react-router-dom';
import Login from './main/components/common/Login';
import Register from './main/components/common/Register';
import MainLayout from './main/layout/MainLayout';
import LandingPage from './main/components/common/landingPage/LandingPage';
import DashboardLayout from './main/layout/DashboardLayout';
import AttentionVerifyAccount from './main/components/common/attentionPage/AttentionVerifyAccount';
import VerifyAccount from './main/components/common/VerifyAccount';
import AttentionVerifySuccessful from './main/components/common/attentionPage/AttentionVerifySuccessful';
import Home from './main/screens/client/home/Home';
import ManageMovies from './main/screens/admin/manage_movies/ManageMovies';
import CreateMovie from './main/screens/admin/manage_movies/CreateMovie';
import SelectMovies from './main/screens/branch/select_movies/SelectMovies';
import ManagePublicMovie from './main/screens/branch/manage_movies/ManagePublicMovie';
import ManageCategory from './main/screens/admin/manage_categories/ManageCategory';
import EditMovieScreen from './main/screens/admin/manage_movies/EditMovieScreen';
import MovieDetail from './main/screens/client/movie/MovieDetail';
import Payment from './main/screens/client/payment/Payment';
import ManageTickets from './main/screens/client/tickets/ManageTickets';
import AttentionPaymentSuccessful from './main/components/common/attentionPage/AttentionPaymentSuccessful';
import PurchaseDetail from './main/screens/client/tickets/PurchaseDetail';
import ManageUsers from './main/screens/admin/manage_users/ManageUsers';
import CreateUser from './main/screens/admin/manage_users/CreateUser';
import ManageBranches from './main/screens/admin/manage_branches/ManageBranches';
import CreateBranch from './main/screens/admin/manage_branches/CreateBranch';
import EditUser from './main/screens/admin/manage_users/EditUser';
import EditBranch from './main/screens/admin/manage_branches/EditBranch';

const routes = [
  {
    path: '/client',
    element: <DashboardLayout />,
    children: [
      {path: 'home', element: <Home />},
      {path: 'home/:movieUuid', element: <MovieDetail />},
      {path: 'payment/:movieUuid', element: <Payment />},
      {path: 'payment/successful', element: <AttentionPaymentSuccessful />},
      {path: 'tickets', element: <ManageTickets />},
      {path: 'tickets/:purchaseUuid', element: <PurchaseDetail />},
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
      {path: 'manage-user', element: <ManageUsers />},
      {path: 'manage-user/create', element: <CreateUser />},
      {path: 'manage-user/:userUuid', element: <EditUser />},
      {path: 'manage-branch', element: <ManageBranches />},
      {path: 'manage-branch/create', element: <CreateBranch />},
      {path: 'manage-branch/:userUuid', element: <EditBranch />},
      {path: 'movies', element: <ManageMovies />},
      {path: 'movies/:movieUuid', element: <EditMovieScreen />},
      {path: 'movies/create', element: <CreateMovie />},
      {path: 'categories', element: <ManageCategory />},
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
      {path: 'public-movies', element: <ManagePublicMovie />},
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
