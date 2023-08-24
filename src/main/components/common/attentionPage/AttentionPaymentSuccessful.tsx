import {Box, Button, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

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

const AttentionPaymentSuccessful = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const onClickBtn = () => {
    navigate('/client/tickets');
  };

  return (
    <Box className={classes.containerMain}>
      <Box className={classes.containerChild}>
        <CreditScoreIcon className={classes.icon} color="primary" />
        <Typography width="40rem" align="center">
          Bạn đã thanh toán thành công!. Vui lòng đi đến mục "Số vé đã mua" để
          kiểm tra thông tin vé của bạn. Xin cảm ơn!
        </Typography>
        <Button variant="contained" onClick={onClickBtn}>
          Đi đến vé đã mua
        </Button>
      </Box>
    </Box>
  );
};

export default AttentionPaymentSuccessful;
