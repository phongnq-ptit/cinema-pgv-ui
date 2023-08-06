import {Box, Button, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';

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

const AttentionVerifyAccount = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const onClickBtn = () => {
    navigate('/');
  };

  return (
    <Box className={classes.containerMain}>
      <Box className={classes.containerChild}>
        <MailIcon className={classes.icon} color="primary" />
        <Typography width="40rem" align="center">
          Bạn đã đăng ký thành công tài khoản và bạn hãy vào email đã đăng ký
          tài khoản để xác minh tài khoản để có thể đăng nhập vào hệ thông
          Cinema PGV
        </Typography>
        <Button variant="contained" onClick={onClickBtn}>
          Đi đến trang chủ
        </Button>
      </Box>
    </Box>
  );
};

export default AttentionVerifyAccount;
