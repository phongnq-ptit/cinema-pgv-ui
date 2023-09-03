import {
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
import {User} from '../../../models/User';
import UserRow from './UserRow';

interface Props {
  users: User[];
}

interface Column {
  id: 'name' | 'email' | 'address' | 'role' | 'active' | 'action';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  {id: 'name', label: 'Tên', minWidth: 200},
  {id: 'email', label: 'Email', minWidth: 200},
  {
    id: 'address',
    label: 'Địa chỉ',
    minWidth: 200,
  },
  {
    id: 'role',
    label: 'Vai trò',
    minWidth: 50,
  },
  {
    id: 'active',
    label: 'Xác thực',
    minWidth: 50,
  },
  {
    id: 'action',
    label: '',
    minWidth: 170,
  },
];

const UsersTable = ({props}: {props: Props}) => {
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
    <React.Fragment>
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
              {props.users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => {
                  return <UserRow props={{user}} key={user.uuid} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{mr: 6}}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={props.users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </React.Fragment>
  );
};

export default UsersTable;
