import {Box, Fab, Grid, Tooltip, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@mui/styles';
import {green} from '@mui/material/colors';
import useMovieApi from '../../../hooks/apis/useMovieApi';
import {Movie} from '../../../models/Movie';
import MovieTable from '../../../components/admin/manage_movies/MovieTable';

const useStyles = makeStyles({
  root: {},
  fabStyle: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    color: 'common.white',
    bgcolor: green[500],
    '&:hover': {
      bgcolor: green[600],
    },
  },
});

const ManageMovies = () => {
  const {getListMovies} = useMovieApi();
  const [movies, setMovies] = useState<Array<Movie>>([]);

  useEffect(() => {
    getListMovies()
      .then((response) => {
        setMovies(response.data);
      })
      .catch((e) => console.log(e));
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container justifyContent="center" alignItems="center" my={5}>
        <Grid item xs={12} mb={3}>
          <Typography
            sx={{
              fontSize: '30px',
              textTransform: 'capitalize',
              fontWeight: 600,
            }}
          >
            Danh sách phim
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <MovieTable props={{movies: movies}} />
        </Grid>
      </Grid>
      <Box className={classes.fabStyle}>
        <Tooltip title="Thêm phim mới" placement="top">
          <Fab color="primary" aria-label="add" href="/admin/movies/create">
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
    </React.Fragment>
  );
};

export default ManageMovies;
