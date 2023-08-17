import React, {useState} from 'react';
import {Movie} from '../../../models/Movie';
import MovieCard from '../../common/movies/MovieCard';
import {Button} from '@mui/material';
import CustomDialog from '../../common/dialog/CustomDialog';
import CarouselImage from '../../common/CarouselImage';

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
      <CustomDialog props={{open, setOpen}}>
        <CustomDialog.Slot name="title">{props.movie.name}</CustomDialog.Slot>
        <CustomDialog.Slot name="content">
          <CarouselImage
            props={{images: props.movie.images.map((item) => item.url)}}
          />
        </CustomDialog.Slot>
      </CustomDialog>
    </React.Fragment>
  );
};

export default MovieItem;
