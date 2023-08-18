import React, {useState} from 'react';
import {Movie} from '../../../models/Movie';
import MovieCard from '../../common/movies/MovieCard';
import {Button, Typography} from '@mui/material';
import SelectMovieDialog from './SelectMovieDialog';
import dayjs from 'dayjs';

interface BaseProps {
  movie: Movie;
}

const MovieItem = ({props}: {props: BaseProps}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickBtn = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <MovieCard props={{movie: props.movie}}>
        <MovieCard.Slot name="content">
          <Typography variant="body1" color="text.secondary" sx={{mb: 1}}>
            Tác giả: {props.movie.author}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{mb: 1}}>
            Thời lượng: {`${props.movie.duration} phút`}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{mb: 1}}>
            Ngày phát hành:
            {` ${dayjs(props.movie.releaseDate).format('DD/MM/YYYY')}`}
          </Typography>
        </MovieCard.Slot>
        <MovieCard.Slot name="action">
          <Button
            sx={{
              textDecoration: 'underline',
              fontWeight: 600,
              letterSpacing: 1,
            }}
            onClick={handleClickBtn}
          >
            Xem chi tiết
          </Button>
        </MovieCard.Slot>
      </MovieCard>
      <SelectMovieDialog props={{open, setOpen, movie: props.movie}} />
    </React.Fragment>
  );
};

export default MovieItem;
