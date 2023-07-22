import {Backdrop, CircularProgress} from '@mui/material';
import React, {useContext} from 'react';
import {LoadingContext} from '../../hooks/contexts/LoadingContext';

const LoadingPage = () => {
  const {loadingPage} = useContext(LoadingContext);

  return (
    <Backdrop
      sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
      open={loadingPage}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingPage;
