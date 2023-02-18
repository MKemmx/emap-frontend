import { useState } from 'react';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Alert, AlertTitle, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// Store
import { useLoginStore } from '../../../store/loginStore';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login, error, setError, loading } = useLoginStore((state) => state);

  // login Data
  const loginDataState = {
    userName: '',
    password: '',
  };
  const [loginData, setLoginData] = useState(loginDataState);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const { userName, password } = loginData;

    if (userName === '') {
      return setError({
        title: 'Username',
        description: 'Please enter your username',
      });
    }

    if (password === '') {
      return setError({
        title: 'Password',
        description: 'Please enter your password',
      });
    }

    return login(loginData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <>
      {error !== null && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error">
            <AlertTitle>Error: {error?.title} </AlertTitle>
            {error?.description}
          </Alert>
        </Box>
      )}
      <Stack sx={{ mt: 2 }} spacing={3}>
        <TextField value={loginData.userName} onChange={handleChange} name="userName" label="Username" />

        <TextField
          onChange={handleChange}
          value={loginData.password}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" /> */}
        <Link color="primary.light" variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        sx={{
          background: '#900303',
          '&:hover': {
            background: 'rgba(144,3,3, 0.8)',
          },
        }}
        loading={loading}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleLogin}
      >
        Login
      </LoadingButton>
    </>
  );
}
