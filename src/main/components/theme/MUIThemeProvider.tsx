import {ThemeProvider} from '@mui/material';
import React, {ReactNode} from 'react';
import theme from './theme';

const MUIThemeProvider = ({children}: {children: ReactNode}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MUIThemeProvider;
