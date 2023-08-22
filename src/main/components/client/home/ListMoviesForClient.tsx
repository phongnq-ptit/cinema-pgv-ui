import React from 'react';
import {Movie} from '../../../models/Movie';
import {Grid, Pagination} from '@mui/material';
import MovieItemForClient from './MovieItemForClient';

interface Props {
  movies: Movie[];
}

const ListMoviesForClient = ({props}: {props: Props}) => {
  const [page, setPage] = React.useState(1);
  const PER_PAGE = 8;
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Grid container spacing={2}>
      {props.movies
        .slice((page - 1) * PER_PAGE, (page - 1) * PER_PAGE + PER_PAGE)
        .map((item) => (
          <MovieItemForClient
            props={{movie: item}}
            key={item.uuid}
          ></MovieItemForClient>
        ))}
      <Grid item xs={12} sx={{my: 2}}>
        <Pagination
          count={Math.ceil(props.movies.length / PER_PAGE)}
          size="medium"
          page={page}
          color="primary"
          onChange={handleChangePage}
        />
      </Grid>
    </Grid>
  );
};

export default ListMoviesForClient;
