import React, {useContext, useEffect, useState} from 'react';
import usePaymentApi from '../../../hooks/apis/usePaymentApi';
import {AuthContext} from '../../../hooks/contexts/AuthContext';
import {LoadingContext} from '../../../hooks/contexts/LoadingContext';
import {Box, Button, Grid, Paper, Typography} from '@mui/material';
import {Purchase} from '../../../models/Purchase';
import {formatDate, formatter} from '../../../utils/CommonUtils';
import {useNavigate} from 'react-router-dom';

const ManageTickets = () => {
  const {LoginUser} = useContext(AuthContext);
  const {setLoadingPage} = useContext(LoadingContext);
  const {getPurchasesByUser} = usePaymentApi();
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    setLoadingPage(true);
    getPurchasesByUser({userUuid: LoginUser.uuid})
      .then((response) => {
        setPurchases(response.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingPage(false);
        }, 750);
      });
  }, []);

  const handleClick = (item: Purchase) => {
    navigate(`/client/tickets/${item.uuid}`);
  };

  return (
    <Box sx={{minHeight: '80vh'}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            sx={{
              width: '100%',
              fontSize: '2rem',
              fontWeight: 600,
              my: 3,
              textAlign: 'center',
            }}
          >{`Lịch sử mua vé`}</Typography>
        </Grid>
        {purchases.map((item) => (
          <Grid item xs={12} key={item.uuid}>
            <Button
              sx={{width: '100%', minHeight: '80px'}}
              onClick={() => handleClick(item)}
            >
              <Paper elevation={3} sx={{width: '100%', minHeight: '80px'}}>
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Grid item xs={2}>
                    <Box py={2}>
                      <Typography sx={{fontWeight: 600}}>Người mua:</Typography>
                      <Typography>{item.user.userName}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box py={2}>
                      <Typography sx={{fontWeight: 600}}>Tên phim:</Typography>
                      <Typography>{item.moviePublic.movie.name}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box py={2}>
                      <Typography sx={{fontWeight: 600}}>
                        Thời gian công chiếu:
                      </Typography>
                      <Typography>
                        {formatDate(
                          item.moviePublic.startDate,
                          item.moviePublic.endDate
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box py={2}>
                      <Typography sx={{fontWeight: 600}}>Chi nhánh:</Typography>
                      <Typography>
                        {item.moviePublic.branch.userName}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box py={2}>
                      <Typography sx={{fontWeight: 600}}>
                        Số lượng vé:
                      </Typography>
                      <Typography>{`${item.quantityOfTickets} vé`}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box py={2}>
                      <Typography sx={{fontWeight: 600}}>Tổng tiền:</Typography>
                      <Typography>
                        {formatter.format(
                          item.moviePublic.price * item.quantityOfTickets
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ManageTickets;
