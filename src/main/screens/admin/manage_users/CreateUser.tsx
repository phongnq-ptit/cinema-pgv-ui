import React, {useContext, useState} from 'react';
import useUserApi, {ICreateUser} from '../../../hooks/apis/useUserApi';
import {UserRole} from '../../../models/enums/UserRole';
import {Box, Button, Grid, Paper, TextField, Typography} from '@mui/material';
import {LoadingContext} from '../../../hooks/contexts/LoadingContext';
import {useNavigate} from 'react-router-dom';
import {successSnackbar, warningSnackbar} from '../../../utils/showSnackbar';

const CreateUser = () => {
  const navigate = useNavigate();
  const {createUser} = useUserApi();
  const {setLoadingPage} = useContext(LoadingContext);
  const [newUser, setNewUser] = useState<ICreateUser>({
    uuid: '',
    userName: '',
    email: '',
    password: '',
    address: '',
    role: UserRole.CLIENT,
    active: 1,
    cinemaId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const handleSubmit = () => {
    const {userName, email, password, address} = newUser;
    if (userName === '' || email === '' || password === '' || address === '') {
      warningSnackbar('Không được để trống!');
      return;
    }
    setLoadingPage(true);
    console.log(newUser);

    createUser(newUser)
      .then((response) => {
        successSnackbar(`Thêm khách hàng ${newUser.userName} thành công!`);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingPage(false);
          navigate('/admin/manage-user');
        }, 1500);
      });
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
          Thêm Khách hàng mới
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
                  value={newUser.userName}
                  onChange={(event) =>
                    setNewUser({...newUser, userName: event.target.value})
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  margin="normal"
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={newUser.email}
                  onChange={(event) =>
                    setNewUser({...newUser, email: event.target.value})
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
                  value={newUser.address}
                  onChange={(event) =>
                    setNewUser({...newUser, address: event.target.value})
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
                  defaultValue={newUser.role}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  margin="normal"
                  label="Mật khẩu"
                  variant="outlined"
                  value={newUser.password}
                  onChange={(event) =>
                    setNewUser({...newUser, password: event.target.value})
                  }
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
                  Thêm khách hàng mới
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default CreateUser;
