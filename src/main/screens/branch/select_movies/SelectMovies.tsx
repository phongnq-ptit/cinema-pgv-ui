import React, {useEffect, useState} from 'react';
import {Grid} from '@mui/material';
import {Movie} from '../../../models/Movie';
import useMovieApi from '../../../hooks/apis/useMovieApi';
import MovieItem from '../../../components/branch/select_movies/MovieItem';

const SelectMovies = () => {
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

  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <MovieItem props={{movie}} key={movie.uuid} />
      ))}
    </Grid>
  );
};

export default SelectMovies;
