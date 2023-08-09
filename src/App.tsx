import React, {useContext, useEffect} from 'react';
import {useLocation, useNavigate, useRoutes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';
import {LoadingContextProvider} from './main/hooks/contexts/LoadingContext';
import LoadingPage from './main/components/common/LoadingPage';
import {AuthContext} from './main/hooks/contexts/AuthContext';
import {UserRole} from './main/models/enums/UserRole';

function App() {
  const routing = useRoutes(routes);
  const location = useLocation();
  const navigate = useNavigate();
  const {LoginUser, setLoginUser, setAccessToken, setRefreshToken} =
    useContext(AuthContext);
  const loginObj = localStorage.getItem('login');

  useEffect(() => {
    if (loginObj) {
      const _loginObj = JSON.parse(loginObj);
      setLoginUser(_loginObj.user);
      setAccessToken(_loginObj.accessToken);
      setRefreshToken(_loginObj.refreshToken);
    }
  }, [loginObj]);

  useEffect(() => {
    if (LoginUser) {
      router();
    }
  }, [location.pathname]);

  function router() {
    switch (LoginUser.role) {
      case UserRole.CLIENT:
        if (!location.pathname.includes('/client/')) {
          navigate('/client/home');
        }
        break;
      case UserRole.ADMIN:
        if (!location.pathname.includes('/admin/')) {
          navigate('/admin/manage-user');
        }
        break;
      case UserRole.BRANCH:
        if (!location.pathname.includes('/branch/')) {
          navigate('/branch/movies');
        }
        break;
    }
  }

  return (
    <LoadingContextProvider>
      {routing}
      <LoadingPage />
      <ToastContainer />
    </LoadingContextProvider>
  );
}

export default App;
