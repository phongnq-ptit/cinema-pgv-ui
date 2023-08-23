import React, {useContext, useEffect, useState} from 'react';
import useMovieApi from '../../../hooks/apis/useMovieApi';
import {LoadingContext} from '../../../hooks/contexts/LoadingContext';
import {useNavigate, useParams} from 'react-router-dom';
import {Movie} from '../../../models/Movie';
import {Box, Button, Grid, Typography} from '@mui/material';
import CarouselImage from '../../../components/common/CarouselImage';
import dayjs from 'dayjs';
import AddCardIcon from '@mui/icons-material/AddCard';

const MovieDetail = () => {
  const navigate = useNavigate();
  const {getMovie} = useMovieApi();
  const {setLoadingPage} = useContext(LoadingContext);
  const params = useParams();
  const [movie, setMovie] = useState<Movie>({
    uuid: '',
    name: '',
    duration: 0,
    author: '',
    releaseDate: new Date(),
    categories: [],
    images: [],
    movieFile: null,
    active: 1,
  });

  useEffect(() => {
    if (params.movieUuid) {
      setLoadingPage(true);
      getMovie(params.movieUuid as string)
        .then((response) => {
          setMovie(response.data);
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setTimeout(() => {
            setLoadingPage(false);
          }, 1000);
        });
    }
    // eslint-disable-next-line
  }, [params.movieUuid]);

  return (
    <React.Fragment>
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
          >{`Thông tin chi tiết phim: ${movie.name}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <CarouselImage
                props={{images: movie.images!.map((item) => item.url)}}
              />
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2} my={4}>
                <Grid item xs={3}>
                  <Typography sx={{fontWeight: 600}}>Tên phim:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1">{movie.name}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography sx={{fontWeight: 600}}>Thời lượng:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1">{`${movie.duration} phút`}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography sx={{fontWeight: 600}}>Tác giả:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1">{`${movie.author}`}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography sx={{fontWeight: 600}}>
                    Ngày phát hành:
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1">{`${dayjs(
                    movie.releaseDate
                  ).format('DD / MM / YYYY')}`}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography sx={{fontWeight: 600}}>Thể loại:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1">{`${movie.categories
                    .map((item) => item.name)
                    .join(', ')}`}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      mt: 4,
                    }}
                  >
                    <Button
                      sx={{
                        textAlign: 'center',
                        width: '80%',
                        fontSize: '1rem',
                        fontWeight: 600,
                      }}
                      startIcon={<AddCardIcon />}
                      variant="outlined"
                      onClick={() => navigate(`/client/payment/${movie.uuid}`)}
                    >
                      Mua vé ngay
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MovieDetail;
