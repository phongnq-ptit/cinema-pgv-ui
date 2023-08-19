import React, {useContext, useEffect} from 'react';
import {useLocation, useNavigate, useRoutes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';
import {LoadingContextProvider} from './main/hooks/contexts/LoadingContext';
import LoadingPage from './main/components/common/LoadingPage';
import {AuthContext} from './main/hooks/contexts/AuthContext';
import {UserRole} from './main/models/enums/UserRole';
import ErrorDialog from './main/components/common/dialog/ErrorDialog';

function App() {
  const routing = useRoutes(routes);
  const location = useLocation();
  const navigate = useNavigate();
  const {LoginUser, setLoginUser, setAccessToken, setRefreshToken, error} =
    useContext(AuthContext);
  const loginObj = localStorage.getItem('login');

  useEffect(() => {
    if (loginObj) {
      const _loginObj = JSON.parse(loginObj);
      setLoginUser(_loginObj.user);
      setAccessToken(_loginObj.accessToken);
      setRefreshToken(_loginObj.refreshToken);
    }
    // eslint-disable-next-line
  }, [loginObj]);

  useEffect(() => {
    if (LoginUser) {
      router();
    }
    // eslint-disable-next-line
  }, [location.pathname, loginObj]);

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
      {!error.open && <ToastContainer />}
      <ErrorDialog />
    </LoadingContextProvider>
  );
}

export default App;
