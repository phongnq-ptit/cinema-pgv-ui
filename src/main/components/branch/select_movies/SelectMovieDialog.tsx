import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../hooks/contexts/AuthContext';
import {Movie, MoviePublic} from '../../../models/Movie';
import dayjs from 'dayjs';
import CarouselImage from '../../common/CarouselImage';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import {LocalizationProvider, MobileDateTimePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import useMovieApi from '../../../hooks/apis/useMovieApi';
import {
  errorSnackbar,
  successSnackbar,
  warningSnackbar,
} from '../../../utils/showSnackbar';
import {passDataTime} from '../../../utils/CommonUtils';

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
    if (moviePublic.price <= 0 || moviePublic.totalTickets <= 0) {
      warningSnackbar(
        'Không được để trống và giá trị nhỏ nhất phải lớn hơn 1!'
      );
      return;
    }

    addMoviePublic({
      ...moviePublic,
      startDate: passDataTime(moviePublic.startDate),
      endDate: passDataTime(moviePublic.endDate),
    })
      .then((response) => {
        successSnackbar(`Phát hành phim ${moviePublic.movie.name} thành công`);
        props.setOpen(false);
      })
      .catch((e) => errorSnackbar(e));
  };

  const handleClose = () => {
    setMoviePublic(initMoviePublic);
    props.setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  useEffect(() => {
    if (props.open) {
      const {current: descriptionElement} = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.open]);

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        scroll="paper"
        fullWidth
        maxWidth="md"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{props.movie.name}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <CarouselImage
              props={{images: props.movie.images!.map((item) => item.url)}}
            />
            <Typography
              component="h3"
              sx={{fontSize: '20px', mt: 2, fontWeight: 600, mb: 1}}
            >
              Thông tin cơ bản:
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
              Thiết lập phát hành phim:
            </Typography>
            <Grid component="form" container spacing={2} mt={1}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDateTimePicker
                    label="Thời gian bắt đầu phát sóng"
                    value={dayjs(moviePublic.startDate)}
                    onChange={(newValue) => {
                      const startDate = newValue
                        ? new Date(newValue.toDate())
                        : new Date();
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
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{textDecoration: 'underline'}}>
          <Button sx={{fontWeight: 600}} onClick={handleSave}>
            Phát hành phim
          </Button>
          <Button sx={{fontWeight: 600}} onClick={handleClose}>
            Trở lại
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default SelectMovieDialog;
