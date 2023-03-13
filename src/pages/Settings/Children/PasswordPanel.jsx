import React, { useState } from 'react';

// Axios
import axios from 'axios';

// Material UI
import { Grid, TextField, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Axios

const PasswordPanel = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Data State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleLogin = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return setError('Some input fields has some errors!');
    }

    if (newPassword !== confirmPassword) {
      return setError('Incorect confirm password!');
    }

    setLoading(true);
    try {
      await axios.post('/setting/update-password', {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      setError(null);
      setSuccess('Password updated!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError(error.response.data.msg);
      setSuccess(null);
    } finally {
      setLoading(false);
    }
    return null;
  };

  return (
    <>
      {error !== null && <Alert severity="error">{error}</Alert>}
      {success !== null && <Alert severity="success">{success}</Alert>}

      <Grid py={3} rowGap={2} container>
        <Grid item xs={12}>
          <TextField
            type="password"
            error={error}
            onChange={(e) => setOldPassword(e.target.value)}
            fullWidth
            value={oldPassword}
            label="Old password"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            error={error}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            value={newPassword}
            label="New password"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            error={error}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            value={confirmPassword}
            label="Confirm new password"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <LoadingButton loading={loading} onClick={handleLogin} variant="contained">
            Confirm
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};

export default PasswordPanel;
