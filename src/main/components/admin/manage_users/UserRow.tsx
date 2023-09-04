import React from 'react';
import {User} from '../../../models/User';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, TableCell, TableRow} from '@mui/material';

interface Props {
  user: User;
}

const UserRow = ({props}: {props: Props}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <React.Fragment>
      <TableRow hover role="checkbox" tabIndex={-1} key={props.user.uuid}>
        <TableCell>{props.user.userName}</TableCell>
        <TableCell>{props.user.email}</TableCell>
        <TableCell>{props.user.address}</TableCell>
        <TableCell>{props.user.role}</TableCell>
        <TableCell>
          {props.user.active === 1 ? `Đã xác minh` : `Chưa xác minh`}
        </TableCell>
        <TableCell align="center">
          <Button
            variant="outlined"
            sx={{mx: 1}}
            onClick={() => {
              navigate(
                location.pathname.includes('manage-branch')
                  ? `/admin/manage-branch/${props.user.uuid}`
                  : `/admin/manage-user/${props.user.uuid}`
              );
            }}
          >
            Cập nhật
          </Button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default UserRow;
