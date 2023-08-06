import {Box, Button, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const useStyles = makeStyles({
  root: {},
  containerMain: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  containerChild: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    border: '3px solid #546e7a',
    gap: '2em',
    padding: '4rem',
    borderRadius: '1rem',
  },
  icon: {
    fontSize: '7rem',
  },
});

const AttentionVerifySuccessful = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const onClickBtn = () => {
    navigate('/login');
  };

  return (
    <Box className={classes.containerMain}>
      <Box className={classes.containerChild}>
        <VerifiedUserIcon className={classes.icon} color="primary" />
        <Typography width="40rem" align="center">
          Tài khoản của bạn đã được xác thực thành công. Vui lòng đi đến trang
          đăng nhập để bắt đầu sử dụng hệ thống của chúng tôi.
        </Typography>
        <Button variant="contained" onClick={onClickBtn}>
          Đăng nhập ngay
        </Button>
      </Box>
    </Box>
  );
};

export default AttentionVerifySuccessful;
