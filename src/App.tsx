import React from 'react';
import {useRoutes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import routes from './routes';
import {LoadingContextProvider} from './main/hooks/contexts/LoadingContext';
import LoadingPage from './main/components/common/LoadingPage';

function App() {
  const routing = useRoutes(routes);

  return (
    <React.Fragment>
      <LoadingContextProvider>
        {routing}
        <LoadingPage />
        <ToastContainer />
      </LoadingContextProvider>
    </React.Fragment>
  );
}

export default App;
