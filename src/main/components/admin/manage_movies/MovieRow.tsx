import React from 'react';
import {Movie} from '../../../models/Movie';
import {Button, Checkbox, TableCell, TableRow} from '@mui/material';
import dayjs from 'dayjs';
import {useNavigate} from 'react-router-dom';

interface Props {
  movie: Movie;
  movieSelected: string[];
  setMovieSelected: Function;
}

const MovieRow = ({props}: {props: Props}) => {
  const navigate = useNavigate();
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
        <TableCell>{props.movie.name}</TableCell>
        <TableCell>{props.movie.author}</TableCell>
        <TableCell>{`${props.movie.duration} phút`}</TableCell>
        <TableCell>
          {dayjs(props.movie.releaseDate).format('HH:mm, DD/MM/YYYY')}
        </TableCell>
        <TableCell>
          {props.movie.categories.map((category) => category.name).join(', ')}
        </TableCell>
        <TableCell align="center">
          <Button
            variant="outlined"
            sx={{mx: 1}}
            onClick={() => {
              navigate(`/admin/movies/${props.movie.uuid}`);
            }}
          >
            Sửa
          </Button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default MovieRow;
