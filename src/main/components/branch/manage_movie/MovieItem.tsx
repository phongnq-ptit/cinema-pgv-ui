import React, {useState} from 'react';
import {Button, Checkbox, TableCell, TableRow} from '@mui/material';
import dayjs from 'dayjs';
import {MoviePublic} from '../../../models/Movie';
import {formatter} from '../../../utils/CommonUtils';
import SelectMovieDialog from '../select_movies/SelectMovieDialog';

interface Props {
  movie: MoviePublic;
  movieSelected: string[];
  setMovieSelected: Function;
}

const MovieItem = ({props}: {props: Props}) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const isSelected = () => props.movieSelected.includes(props.movie.uuid);

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      props.setMovieSelected([...props.movieSelected, props.movie.uuid]);
    } else {
      props.setMovieSelected([
        ...props.movieSelected.filter((item) => item !== props.movie.uuid),
      ]);
    }
  };

  return (
    <React.Fragment>
      <TableRow hover role="checkbox" tabIndex={-1} key={props.movie.uuid}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={isSelected()}
            onChange={handleChecked}
            color="primary"
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        <TableCell>{props.movie.movie.name}</TableCell>
        <TableCell>
          {dayjs(props.movie.startDate).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell>{`${dayjs(props.movie.startDate).format('HH:mm')} - ${dayjs(
          props.movie.endDate
        ).format('HH:mm')}`}</TableCell>
        <TableCell>{formatter.format(props.movie.price)}</TableCell>
        <TableCell>{`${props.movie.totalTickets} vé`}</TableCell>
        <TableCell align="center">
          <Button
            variant="outlined"
            sx={{mx: 1}}
            onClick={() => {
              setOpenUpdate(true);
            }}
          >
            Cập nhật
          </Button>
        </TableCell>
      </TableRow>
      <SelectMovieDialog
        props={{
          open: openUpdate,
          setOpen: setOpenUpdate,
          movie: props.movie.movie,
          moviePublic: props.movie,
        }}
      />
    </React.Fragment>
  );
};

export default MovieItem;
