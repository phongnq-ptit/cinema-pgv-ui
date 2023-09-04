import React, {useContext, useState} from 'react';
import {LoginResponse, User} from '../../../models/User';
import useUserApi from '../../../hooks/apis/useUserApi';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import {UserRole} from '../../../models/enums/UserRole';
import {successSnackbar, warningSnackbar} from '../../../utils/showSnackbar';
import {AuthContext} from '../../../hooks/contexts/AuthContext';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const BranchProfile = () => {
  const {accessToken, refreshToken, LoginUser, setLoginUser} =
    useContext(AuthContext);

  const {updateUser} = useUserApi();
  const [user, setUser] = useState<User>(LoginUser);

  const handleSubmit = () => {
    const {userName, address} = user;
    if (userName === '' || address === '') {
      warningSnackbar('Không được để trống!');
      return;
    }

    updateUser(LoginUser.uuid, user)
      .then((response) => {
        successSnackbar('Cập nhật thông tin thành công!');

        setLoginUser(user);
        const newStore: LoginResponse = {
          accessToken,
          refreshToken,
          user,
        };
        localStorage.removeItem('login');
        localStorage.setItem('login', JSON.stringify(newStore));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getRole = () => {
    switch (LoginUser.role) {
      case UserRole.ADMIN:
        return 'Quản trị viên';
      case UserRole.BRANCH:
        return 'Chi nhánh';
      case UserRole.CLIENT:
        return 'Khách hàng';
      default:
        return 'unknown';
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
          {`${getRole()}: ${LoginUser.userName}`}
        </Typography>
        <Box
          sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
          <Paper sx={{px: 4, py: 2, mt: 3, width: '60%'}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={2}
                  flexDirection="column"
                  p={3}
                  alignItems="center"
                >
                  <Grid item>
                    <Avatar
                      sx={{
                        backgroundImage:
                          'url(https://source.unsplash.com/random?wallpapers)',
                        width: '90px',
                        height: '90px',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        textDecoration: 'none',
                        textAlign: 'center',
                        fontSize: '2rem',
                      }}
                    >
                      {LoginUser.userName.slice(0, 2).toUpperCase()}
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <AccountBoxIcon sx={{color: 'GrayText'}} />
                      </Grid>
                      <Grid item>
                        <Typography
                          sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            textDecoration: 'none',
                            textAlign: 'center',
                            color: 'GrayText',
                          }}
                        >
                          {getRole()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  margin="normal"
                  label={`Tên ${getRole()}`}
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

export default BranchProfile;
