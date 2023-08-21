import React, {useEffect, useState} from 'react';
import {
  Grid,
  InputAdornment,
  Pagination,
  TextField,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import {Movie} from '../../../models/Movie';
import useMovieApi from '../../../hooks/apis/useMovieApi';
import MovieItem from '../../../components/branch/select_movies/MovieItem';
import SearchIcon from '@mui/icons-material/Search';

const SelectMovies = () => {
  const {getListMovies} = useMovieApi();
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [searchName, setSearchName] = useState<string>('');
  const [reload, setReload] = useState(false);

  const [page, setPage] = React.useState(1);
  const PER_PAGE = 8;
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    getListMovies()
      .then((response) => {
        setMovies(response.data);
      })
      .catch((e) => console.log(e));
    // eslint-disable-next-line
  }, [reload]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
          <Typography
            sx={{
              fontSize: '30px',
              textTransform: 'capitalize',
              fontWeight: 600,
              mb: 3,
            }}
          >
            Chọn phim công chiếu
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Tìm kiếm phim theo tên"
          value={searchName}
          onChange={(event) => setSearchName(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={() => setReload(!reload)}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}></Grid>
      {movies
        .slice((page - 1) * PER_PAGE, (page - 1) * PER_PAGE + PER_PAGE)
        .map((movie) => (
          <MovieItem props={{movie}} key={movie.uuid} />
        ))}
      <Grid item xs={12} sx={{my: 3}}>
        <Pagination
          count={Math.ceil(movies.length / PER_PAGE)}
          size="large"
          page={page}
          color="primary"
          onChange={handleChangePage}
        />
      </Grid>
    </Grid>
  );
};

export default SelectMovies;
