import React, {useContext} from 'react';
import {MoviePublic} from '../../../../models/Movie';
import {ISaveTargets} from '../Payment';
import {Divider, Grid, Typography} from '@mui/material';
import {AuthContext} from '../../../../hooks/contexts/AuthContext';
import dayjs from 'dayjs';
import {formatDate, formatter} from '../../../../utils/CommonUtils';

interface Props {
  moviePublics: MoviePublic[];
  saveTargets: ISaveTargets;
  setSaveTargets: Function;
}

const ReviewPayment = ({props}: {props: Props}) => {
  const {LoginUser} = useContext(AuthContext);
  const moviePublic = props.moviePublics[0];

  return (
    <React.Fragment>
      <Typography
        component="h3"
        sx={{fontSize: '20px', mt: 2, fontWeight: 600, mb: 1}}
      >
        Thông tin người mua:
      </Typography>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={6}>
          <Typography component="span" sx={{fontWeight: 600}}>
            Họ tên:
          </Typography>
          <span>{` ${LoginUser.userName}`}</span>
        </Grid>
        <Grid item xs={6}>
          <Typography component="span" sx={{fontWeight: 600}}>
            Email:
          </Typography>
          <span>{` ${LoginUser.email}`}</span>
        </Grid>
        <Grid item xs={12}>
          <Typography component="span" sx={{fontWeight: 600}}>
            Địa chỉ:
          </Typography>
          <span>{` ${LoginUser.address}`}</span>
        </Grid>
      </Grid>
      <Divider />
      <Typography
        component="h3"
        sx={{fontSize: '20px', mt: 2, fontWeight: 600, mb: 1}}
      >
        Thông tin bộ phim:
      </Typography>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={6}>
          <Typography component="span" sx={{fontWeight: 600}}>
            Tên phim:
          </Typography>
          <span>{` ${moviePublic.movie.name}`}</span>
        </Grid>
        <Grid item xs={6}>
          <Typography component="span" sx={{fontWeight: 600}}>
            Thời lượng phim:
          </Typography>
          <span>{` ${moviePublic.movie.duration} phút`}</span>
        </Grid>
        <Grid item xs={6}>
          <Typography component="span" sx={{fontWeight: 600}}>
            Tác giả:
          </Typography>
          <span>{` ${moviePublic.movie.author}`}</span>
        </Grid>
        <Grid item xs={6}>
          <Typography component="span" sx={{fontWeight: 600}}>
            Ngày phát hành:
          </Typography>
          <span>{` ${dayjs(moviePublic.movie.releaseDate).format(
            'DD/MM/YYYY'
          )}`}</span>
        </Grid>
        <Grid item xs={12}>
          <Typography component="span" sx={{fontWeight: 600}}>
            Thể loại:
          </Typography>
          <span>{` ${moviePublic.movie.categories
            .map((item) => item.name)
            .join(', ')}`}</span>
        </Grid>
      </Grid>
      <Divider />
      <Typography
        component="h3"
        sx={{fontSize: '20px', mt: 2, fontWeight: 600, mb: 1}}
      >
        Thông tin vé mua:
      </Typography>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={6}>
          <Typography component="span" sx={{fontWeight: 600}}>
            Ngày công chiếu:
          </Typography>
          <Typography>{`${formatDate(
            moviePublic.startDate,
            moviePublic.endDate
          )}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="span" sx={{fontWeight: 600}}>
            Số vé mua:
          </Typography>
          <span>{` ${props.saveTargets.numberOfTicket} vé`}</span>
        </Grid>
        <Grid item xs={6}>
          <Typography component="span" sx={{fontWeight: 600}}>
            Chinh nhánh đến:
          </Typography>
          <Typography>{` ${moviePublic.branch.userName}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="span" sx={{fontWeight: 600}}>
            Thành tiền:
          </Typography>
          <span>{` ${formatter.format(
            moviePublic.price * props.saveTargets.numberOfTicket
          )}`}</span>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ReviewPayment;
