import React from 'react';
import {useRoutes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';
import {LoadingContextProvider} from './main/hooks/contexts/LoadingContext';
import LoadingPage from './main/components/common/LoadingPage';
import {AuthContextProvider} from './main/hooks/contexts/AuthContext';
import MUIThemeProvider from './main/components/theme/MUIThemeProvider';

function App() {
  const routing = useRoutes(routes);

  return (
    <MUIThemeProvider>
      <AuthContextProvider>
        <LoadingContextProvider>
          {routing}
          <LoadingPage />
          <ToastContainer />
        </LoadingContextProvider>
      </AuthContextProvider>
    </MUIThemeProvider>
  );
}

export default App;
