import React, {useContext, useEffect, useState} from 'react';
import useMovieApi from '../../../hooks/apis/useMovieApi';
import {AuthContext} from '../../../hooks/contexts/AuthContext';
import {MoviePublic} from '../../../models/Movie';
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MovieTable from '../../../components/branch/manage_movie/MovieTable';
import {successSnackbar} from '../../../utils/showSnackbar';

const ManagePublicMovie = () => {
  const {LoginUser} = useContext(AuthContext);
  const {getListMoviePublic, removeMoviePublic} = useMovieApi();
  const [listMoviePublic, setListMoviePublic] = useState<Array<MoviePublic>>(
    []
  );
  const [searchName, setSearchName] = useState<string>('');
  const [moviePublicSelected, setMoviePublicSelected] = useState<string[]>([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getListMoviePublic({branchUuid: LoginUser.uuid})
      .then((response) => {
        setListMoviePublic(response.data);
      })
      .catch(() => {});
    // eslint-disable-next-line
  }, [reload]);

  const handleRemoveMoviePublic = () => {
    if (moviePublicSelected.length === 0) return;
    removeMoviePublic(moviePublicSelected)
      .then((response) => {
        setMoviePublicSelected([]);
        setReload(!reload);
        successSnackbar('Dừng công chiếu phim thành công!');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: '30px',
              textTransform: 'capitalize',
              fontWeight: 600,
              mb: 2,
            }}
          >
            Quản lý phim đang công chiếu
          </Typography>
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
        <Grid item xs={6}>
          <Button
            disabled={moviePublicSelected.length === 0}
            variant="contained"
            sx={{float: 'right', mr: 3}}
            onClick={handleRemoveMoviePublic}
          >
            Dừng công chiếu
          </Button>
        </Grid>
        <Grid item xs={12}>
          <MovieTable
            props={{
              movies: listMoviePublic,
              movieSelected: moviePublicSelected,
              setMovieSelected: setMoviePublicSelected,
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ManagePublicMovie;
