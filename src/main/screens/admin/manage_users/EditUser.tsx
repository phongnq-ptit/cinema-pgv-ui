import React, {useEffect, useState} from 'react';
import {User} from '../../../models/User';
import useUserApi from '../../../hooks/apis/useUserApi';
import {useParams} from 'react-router-dom';
import {Box, Button, Grid, Paper, TextField, Typography} from '@mui/material';
import {UserRole} from '../../../models/enums/UserRole';
import {successSnackbar, warningSnackbar} from '../../../utils/showSnackbar';

const EditUser = () => {
  const params = useParams();
  const {getUser, updateUser} = useUserApi();
  const [user, setUser] = useState<User>({
    uuid: '',
    userName: '',
    email: '',
    address: '',
    role: UserRole.CLIENT,
    active: 0,
    cinemaId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  useEffect(() => {
    if (params.userUuid) {
      getUser(params.userUuid)
        .then((response) => {
          setUser(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [params]);

  const handleSubmit = () => {
    const {userName, address} = user;
    if (userName === '' || address === '') {
      warningSnackbar('Không được để trống!');
      return;
    }

    if (params.userUuid) {
      updateUser(params.userUuid, user)
        .then((response) => {
          successSnackbar('Cập nhật thông tin khách hàng thành công!');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <React.Fragment>
      <Box sx={{width: '100%'}}>
        <Typography
          sx={{
            fontSize: '30px',
            textTransform: 'capitalize',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          {`Cập nhật thông tin khách hàng: ${user?.userName}`}
        </Typography>
        <Box
          sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
          <Paper sx={{px: 4, py: 2, mt: 3, width: '60%'}}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  margin="normal"
                  label="Tên khách hàng"
                  variant="outlined"
                  value={user.userName}
                  onChange={(event) =>
                    setUser({...user, userName: event.target.value})
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled
                  required
                  margin="normal"
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={user?.email}
                  onChange={(event) =>
                    setUser({...user, email: event.target.value})
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  margin="normal"
                  label="Địa chỉ"
                  variant="outlined"
                  value={user.address}
                  onChange={(event) =>
                    setUser({...user, address: event.target.value})
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  disabled
                  margin="normal"
                  label="Vai trò"
                  variant="outlined"
                  defaultValue={user.role}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{float: 'right'}}
                  onClick={handleSubmit}
                >
                  Cập nhật thông tin
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default EditUser;
