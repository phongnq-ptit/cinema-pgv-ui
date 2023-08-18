import React, {useContext, useEffect, useState} from 'react';
import useMovieApi from '../../../hooks/apis/useMovieApi';
import {AuthContext} from '../../../hooks/contexts/AuthContext';
import {MoviePublic} from '../../../models/Movie';
import {Grid} from '@mui/material';
import MovieItem from '../../../components/branch/manage_movie/MovieItem';

const ManagePublicMovie = () => {
  const {LoginUser} = useContext(AuthContext);
  const {getListMoviePublic} = useMovieApi();
  const [listMoviePublic, setListMoviePublic] = useState<Array<MoviePublic>>(
    []
  );

  useEffect(() => {
    getListMoviePublic({branchUuid: LoginUser.uuid})
      .then((response) => {
        setListMoviePublic(response.data);
      })
      .catch(() => {});
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={2}>
      {listMoviePublic.map((moviePublic) => (
        <MovieItem props={{moviePublic}} key={moviePublic.uuid} />
      ))}
    </Grid>
  );
};

export default ManagePublicMovie;
