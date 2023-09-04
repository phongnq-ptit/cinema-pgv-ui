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
import {Link, useNavigate} from 'react-router-dom';
import {Controller, useForm} from 'react-hook-form';
import {useAuthApi} from '../../hooks/apis/useAuthApi';
import {errorSnackbar, successSnackbar} from '../../utils/showSnackbar';
import {UserRole} from '../../models/enums/UserRole';

const Register = () => {
  const {handleSubmit, control} = useForm();
  const navigate = useNavigate();
  const [err, setErr] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errPassword, setErrPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const {register} = useAuthApi();

  const handleRegister = (data: any) => {
    data.role = UserRole.CLIENT;
    data.active = 0;

    register({...data})
      .then((response) => {
        setLoading(true);
        successSnackbar('Đăng ký thành công!');
        navigate('/verify-account');
      })
      .catch((err) => {
        setErr(err.message);
        errorSnackbar(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validatePassword = (value: string): string => {
    if (value) {
      const checkPasswordFormat: boolean =
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}$/.test(value);

      if (checkPasswordFormat) {
        return 'Mật khẩu cần dài tối thiểu 6 ký tự, phải có 1 chữ thường, 1 chữ hoa, 1 số!';
      }
    }
    return '';
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
          backgroundImage:
            'url(https://i.pinimg.com/564x/58/d6/17/58d6171b8254771726c43d5de8889b08.jpg)',
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
              Đăng ký
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(handleRegister)}
              noValidate
              sx={{mt: 3}}
            >
              {err && <Alert severity="error">{err}</Alert>}
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Controller
                    name="userName"
                    control={control}
                    render={({
                      field: {onChange, value},
                      fieldState: {error},
                    }) => (
                      <TextField
                        required
                        margin="normal"
                        label="Tên người dùng"
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
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    render={({
                      field: {onChange, value},
                      fieldState: {error},
                    }) => (
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
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="address"
                    control={control}
                    render={({
                      field: {onChange, value},
                      fieldState: {error},
                    }) => (
                      <TextField
                        required
                        margin="normal"
                        label="Địa chỉ"
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
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    render={({
                      field: {onChange, value},
                      fieldState: {error},
                    }) => (
                      <TextField
                        required
                        margin="normal"
                        type="password"
                        label="Mật khẩu"
                        variant="outlined"
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                          setErrPassword(validatePassword(event.target.value));
                        }}
                        error={password === '' ? !!error : !!errPassword}
                        helperText={
                          password === '' ? error?.message : errPassword
                        }
                        fullWidth
                      />
                    )}
                    rules={{
                      required: 'Không được để trống!',
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    render={({
                      field: {onChange, value},
                      fieldState: {error},
                    }) => (
                      <TextField
                        required
                        margin="normal"
                        type="password"
                        label="Nhập lại mật khẩu"
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
                      validate: {
                        equals: (value) =>
                          value === password ||
                          'Xác nhận mật khẩu không trùng nhau.',
                      },
                    }}
                  />
                </Grid>
              </Grid>
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
                Đăng ký
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    to="/login"
                    style={{textDecoration: 'none', color: 'darkblue'}}
                  >
                    Bạn dã có tài khoản? Đăng nhập ngay.
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

export default Register;
