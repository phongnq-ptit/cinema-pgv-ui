import React, {useContext, useState} from 'react';
import {AuthContext} from '../../../hooks/contexts/AuthContext';
import {Movie, MoviePublic} from '../../../models/Movie';
import dayjs from 'dayjs';
import CustomDialog from '../../common/dialog/CustomDialog';
import CarouselImage from '../../common/CarouselImage';
import {Button, Grid, TextField} from '@mui/material';
import {LocalizationProvider, MobileDateTimePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import useMovieApi from '../../../hooks/apis/useMovieApi';
import {errorSnackbar, successSnackbar} from '../../../utils/showSnackbar';

interface Props {
  open: boolean;
  setOpen: Function;
  movie: Movie;
}

const SelectMovieDialog = ({props}: {props: Props}) => {
  const {LoginUser} = useContext(AuthContext);
  const {addMoviePublic} = useMovieApi();
  const initMoviePublic = {
    uuid: '',
    movie: props.movie,
    branch: LoginUser,
    startDate: new Date(),
    endDate: dayjs(new Date()).add(props.movie.duration, 'minute').toDate(),
    price: 0,
    totalTickets: 0,
  };

  const [moviePublic, setMoviePublic] = useState<MoviePublic>(initMoviePublic);

  const handleSave = () => {
    addMoviePublic(moviePublic)
      .then((response) => {
        successSnackbar(`Phát hành phim ${moviePublic.movie.name} thành công`);
        props.setOpen(false);
      })
      .catch((e) => errorSnackbar(e));
  };

  const handleCloseDialog = () => {
    setMoviePublic(initMoviePublic);
  };

  return (
    <CustomDialog
      props={{open: props.open, setOpen: props.setOpen, handleCloseDialog}}
    >
      <CustomDialog.Slot name="title">{props.movie.name}</CustomDialog.Slot>
      <CustomDialog.Slot name="content">
        <CarouselImage
          props={{images: props.movie.images!.map((item) => item.url)}}
        />
        <Grid component="form" container spacing={2} mt={2}>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                label="Thời gian bắt đầu phát sóng"
                value={dayjs(moviePublic.startDate)}
                onChange={(newValue) => {
                  const startDate = newValue ? newValue.toDate() : new Date();
                  const endDate = dayjs(startDate)
                    .add(props.movie.duration, 'minute')
                    .toDate();
                  setMoviePublic({
                    ...moviePublic,
                    startDate,
                    endDate,
                  });
                }}
                format="HH:mm, DD/MM/YYYY"
                sx={{width: '100%'}}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                readOnly
                label="Thời gian kết thúc phát sóng"
                value={dayjs(moviePublic.endDate)}
                format="HH:mm, DD/MM/YYYY"
                sx={{width: '100%'}}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              type="number"
              margin="normal"
              label="Giá vé (1 vé)"
              variant="outlined"
              value={moviePublic.price}
              onChange={(event) =>
                setMoviePublic({
                  ...moviePublic,
                  price:
                    Number(event.target.value) < 0
                      ? 0
                      : Number(event.target.value),
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              type="number"
              margin="normal"
              label="Số lượng vé"
              variant="outlined"
              value={moviePublic.totalTickets}
              onChange={(event) =>
                setMoviePublic({
                  ...moviePublic,
                  totalTickets:
                    Number(event.target.value) < 0
                      ? 0
                      : Number(event.target.value),
                })
              }
              fullWidth
            />
          </Grid>
        </Grid>
      </CustomDialog.Slot>
      <CustomDialog.Slot name="action">
        <Button sx={{fontWeight: 600}} onClick={handleSave}>
          Phát hành phim
        </Button>
      </CustomDialog.Slot>
    </CustomDialog>
  );
};

export default SelectMovieDialog;
