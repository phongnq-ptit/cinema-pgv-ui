import {
  Button,
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
import dayjs from 'dayjs';

interface BaseProps {
  movies: Array<Movie>;
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

  return (
    <Paper sx={{width: '100%'}}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
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
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={movie.uuid}
                  >
                    <TableCell>{movie.name}</TableCell>
                    <TableCell>{movie.author}</TableCell>
                    <TableCell>{movie.duration}</TableCell>
                    <TableCell>
                      {dayjs(movie.releaseDate).format('HH:mm, DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      {movie.categories
                        .map((category) => category.name)
                        .join(', ')}
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="outlined">Sửa</Button>
                    </TableCell>
                  </TableRow>
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
  );
};

export default MovieTable;
