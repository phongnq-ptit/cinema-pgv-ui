import React, {useEffect, useState} from 'react';
import CarouselImage from '../../../components/common/CarouselImage';
import {Grid, Typography} from '@mui/material';
import {Movie} from '../../../models/Movie';
import Filter from '../../../components/client/home/Filter';
import useMovieApi from '../../../hooks/apis/useMovieApi';
import ListMoviesForClient from '../../../components/client/home/ListMoviesForClient';

export interface IFilter {
  searchName: string;
  branchUuids: string[];
  categoryUuids: string[];
}

const banner: string[] = [
  'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_1__51.jpg',
  'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980wx448h-min_2.jpg',
  'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/d/e/dem_980x448.jpg',
];

const Home = () => {
  const {getListMoviePublicForClient} = useMovieApi();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filter, setFilter] = useState<IFilter>({
    searchName: '',
    branchUuids: [],
    categoryUuids: [],
  });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const params = {
      movieName: filter.searchName === '' ? undefined : filter.searchName,
      branchUuids:
        filter.branchUuids.length === 0
          ? undefined
          : filter.branchUuids.join('#'),
      categoryUuids:
        filter.categoryUuids.length === 0
          ? undefined
          : filter.categoryUuids.join('#'),
    };
    getListMoviePublicForClient(params)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [reload]);

  return (
    <React.Fragment>
      <CarouselImage
        props={{
          images: banner,
          sx: {width: '100%', height: '450px'},
        }}
      />
      <Grid container spacing={2} my={3}>
        <Grid item xs={12}>
          <Typography
            sx={{fontSize: '2rem', textAlign: 'center', fontWeight: 700}}
          >
            Phim Công Chiếu
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Grid container spacing={2} flexDirection="column">
            <Filter props={{filter, setFilter, reload, setReload}} />
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <ListMoviesForClient props={{movies}} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
