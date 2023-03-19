import React, { useState } from 'react';

// Material UI
import { Grid, TextField, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import axios from 'axios';

const UserInfo = () => {
  const initialState = {
    userName: '',
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
  };
  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    const { value, id } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      await axios.post('/setting/update-profile', data);
      setSuccess('Account Updated');
      setError(null);
    } catch (error) {
      setError(error.response.data.msg);
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error !== null && <Alert severity="error">{error}</Alert>}
      {success !== null && <Alert severity="success">{success}</Alert>}

      <Grid py={3} rowGap={2} container>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="userName"
            value={data.userName}
            onChange={handleChange}
            label="Username"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="firstName"
            value={data.firstName}
            onChange={handleChange}
            label="First Name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="middleName"
            value={data.middleName}
            onChange={handleChange}
            label="Middle Name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="lastName"
            value={data.lastName}
            onChange={handleChange}
            label="Last Name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="email"
            value={data.email}
            onChange={handleChange}
            label="Email Address"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            fullWidth
            id="password"
            value={data.password}
            onChange={handleChange}
            label="Password"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <LoadingButton loading={loading} onClick={handleUpdateProfile} variant="contained">
            Confirm
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};

export default UserInfo;
