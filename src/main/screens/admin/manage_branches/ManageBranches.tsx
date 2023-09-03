import React, {useEffect, useState} from 'react';
import useUserApi from '../../../hooks/apis/useUserApi';
import {User} from '../../../models/User';
import {UserRole} from '../../../models/enums/UserRole';
import {
  Box,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {green} from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import UsersTable from '../../../components/admin/manage_users/UsersTable';

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

const ManageBranches = () => {
  const classes = useStyles();
  const {getUserByRole} = useUserApi();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState<string>('');

  useEffect(() => {
    const params = {
      role: UserRole.BRANCH,
      search: searchName === '' ? undefined : searchName,
    };
    getUserByRole(params)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [loading]);

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
          Danh sách Khánh hàng
        </Typography>
        <Grid container spacing={2} mt={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              label="Tìm kiếm theo tên hoặc email"
              sx={{width: '80%'}}
              value={searchName}
              onChange={(event) => setSearchName(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={() => setLoading(!loading)}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid container mt={2}>
          <Grid item xs={12}>
            <UsersTable props={{users}} />
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.fabStyle}>
        <Tooltip title="Khách hàng mới" placement="top">
          <Fab
            color="primary"
            aria-label="add"
            href="/admin/manage-branch/create"
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
    </React.Fragment>
  );
};

export default ManageBranches;
