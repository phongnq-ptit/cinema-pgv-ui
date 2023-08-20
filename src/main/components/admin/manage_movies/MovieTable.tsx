import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import React from 'react';
import {Movie} from '../../../models/Movie';
import MovieRow from './MovieRow';
import _ from 'lodash';

interface BaseProps {
  movies: Array<Movie>;
  tab: number;
  movieSelected: string[];
  setMovieSelected: Function;
}

interface Column {
  id: 'name' | 'author' | 'duration' | 'releaseDate' | 'category' | 'action';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  {id: 'name', label: 'Tên', minWidth: 170},
  {id: 'author', label: 'Tác giả', minWidth: 100},
  {
    id: 'duration',
    label: 'Thời lượng (phút)',
    minWidth: 170,
  },
  {
    id: 'releaseDate',
    label: 'Ngày phát hành',
    minWidth: 170,
  },
  {
    id: 'category',
    label: 'Thể loại',
    minWidth: 170,
  },
  {
    id: 'action',
    label: '',
    minWidth: 170,
  },
];

const MovieTable = ({props}: {props: BaseProps}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      props.setMovieSelected(
        _.uniq([
          ...props.movies
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item) => item.uuid),
          ...props.movieSelected,
        ])
      );
    } else {
      props.setMovieSelected([]);
    }
  };

  return (
    <React.Fragment>
      <Paper sx={{width: '100%'}}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    onChange={handleSelectAll}
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{top: 5, minWidth: column.minWidth, fontWeight: 800}}
                    color="primary"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.movies
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((movie) => {
                  return (
                    <MovieRow
                      props={{
                        movie,
                        movieSelected: props.movieSelected,
                        setMovieSelected: props.setMovieSelected,
                      }}
                      key={movie.uuid}
                    />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={props.movies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </React.Fragment>
  );
};

export default MovieTable;
