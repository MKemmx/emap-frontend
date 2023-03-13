import React, { useState } from 'react';

// Material UI
import { Grid, Button, TextField } from '@mui/material';

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

  return (
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
        <TextField fullWidth id="firstName" value={data.firstName} label="First Name" variant="outlined" />
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
          value={data.password}
          onChange={handleChange}
          label="Password"
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Button variant="contained">Confirm</Button>
      </Grid>
    </Grid>
  );
};

export default UserInfo;
