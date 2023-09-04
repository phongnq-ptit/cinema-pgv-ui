import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, {useState} from 'react';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import {Link} from 'react-router-dom';
import {Controller, useForm} from 'react-hook-form';
import {useAuthApi} from '../../hooks/apis/useAuthApi';
import {errorSnackbar, successSnackbar} from '../../utils/showSnackbar';
import {UserRole} from '../../models/enums/UserRole';

const Login = () => {
  const {handleSubmit, control} = useForm();
  const {login} = useAuthApi();
  const [err, setErr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (data: any) => {
    await login({...data})
      .then((response) => {
        localStorage.setItem('login', JSON.stringify(response.data));
        successSnackbar('Đăng nhập thành công!!');

        const nextPath = getPathRoute(response.data.user.role);

        setErr('');
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          window.location.href = nextPath;
        }, 3000);
      })
      .catch((e) => {
        setErr(e.message);
        errorSnackbar(e.message);
      });
  };

  const getPathRoute = (role: UserRole) => {
    switch (role) {
      case UserRole.CLIENT:
        return '/client/home';
      case UserRole.ADMIN:
        return '/admin/manage-user';
      case UserRole.BRANCH:
        return '/branch/movies';
      case UserRole.STAFF:
        return '/staff';
      default:
        return '/404';
    }
  };

  return (
    <Grid container component="main" sx={{height: '100vh'}}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
              <LogoDevIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng Nhập
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(handleLogin)}
              noValidate
              sx={{mt: 1}}
            >
              {err && <Alert severity="error">{err}</Alert>}
              <Controller
                name="email"
                control={control}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <TextField
                    required
                    margin="normal"
                    label="Email"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    fullWidth
                  />
                )}
                rules={{
                  required: 'Không được để trống!',
                  pattern: {
                    // prettier-ignore
                    value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                    message: 'Email không đúng định dạng!',
                  },
                }}
              />
              <Controller
                name="password"
                control={control}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <TextField
                    required
                    margin="normal"
                    type="password"
                    label="Mật khẩu"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    fullWidth
                  />
                )}
                rules={{
                  required: 'Không được để trống!',
                  pattern: {
                    // prettier-ignore
                    value: /^[A-Za-z0-9]{6,}$/,
                    message: 'Độ dài mật khẩu cần lớn hơn hoặc bằng 6!',
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                disabled={loading}
                startIcon={
                  loading && <CircularProgress size={20} color="inherit" />
                }
              >
                Đăng Nhập
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    style={{color: 'darkblue', textDecoration: 'none'}}
                    to="/register"
                  >
                    {'Bạn không có tài khoản? Đăng ký ngay.'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;
