import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import MUIThemeProvider from './main/components/theme/MUIThemeProvider';
import {AuthContextProvider} from './main/hooks/contexts/AuthContext';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';

dayjs.extend(utc);
dayjs.extend(timezone);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MUIThemeProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </MUIThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
