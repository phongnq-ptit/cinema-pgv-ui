import {Box, Fab, Tooltip} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, {useEffect} from 'react';
import {makeStyles} from '@mui/styles';
import {green} from '@mui/material/colors';
import useMovieApi from '../../../hooks/apis/useMovieApi';

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

  useEffect(() => {
    getListMovies()
      .then((response) => {
        console.log('hahah', response);
      })
      .catch((e) => console.log(e));
  });
  const classes = useStyles();
  return (
    <React.Fragment>
      <div>ManageMovies</div>
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
