import {
  Box,
  Button,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@mui/styles';
import {green} from '@mui/material/colors';
import useMovieApi from '../../../hooks/apis/useMovieApi';
import {Movie} from '../../../models/Movie';
import MovieTable from '../../../components/admin/manage_movies/MovieTable';
import SearchIcon from '@mui/icons-material/Search';
import {successSnackbar} from '../../../utils/showSnackbar';

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ManageMovies = () => {
  const {getListMovies, changeMovieActive} = useMovieApi();
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [movieSelected, setMovieSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [tab, setTab] = useState<number>(0);
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    const params = {active: tab === 0 ? 1 : 0};
    getListMovies(params)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((e) => console.log(e));
    // eslint-disable-next-line
  }, [tab, loading]);

  const handleClickActive = () => {
    changeMovieActive(movieSelected, tab)
      .then((response) => {
        successSnackbar('Cập nhật trạng thái phim thành công!');
        setLoading(!loading);
        setMovieSelected([]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Box sx={{width: '100%'}}>
        <Typography
          sx={{
            fontSize: '30px',
            textTransform: 'capitalize',
            fontWeight: 600,
          }}
        >
          Danh sách phim
        </Typography>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs
            value={tab}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab label="Công khai" {...a11yProps(0)} />
            <Tab label="Riêng tư" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Grid container spacing={2} mt={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              label="Tìm kiếm phim theo tên"
              sx={{ml: 3, width: '80%'}}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              disabled={movieSelected.length === 0}
              variant="contained"
              sx={{float: 'right', mr: 3}}
              onClick={handleClickActive}
            >
              {tab === 0 ? `Chuyển sang riêng tư` : `Chuyển sang công khai`}
            </Button>
          </Grid>
        </Grid>
        <CustomTabPanel value={tab} index={0}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <MovieTable
                props={{
                  movies: movies,
                  tab: tab,
                  movieSelected,
                  setMovieSelected,
                }}
              />
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <MovieTable
                props={{
                  movies: movies,
                  tab: tab,
                  movieSelected,
                  setMovieSelected,
                }}
              />
            </Grid>
          </Grid>
        </CustomTabPanel>
      </Box>

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
