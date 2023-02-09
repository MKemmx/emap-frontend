import React, { useState, useEffect } from 'react';

import { Box, Modal, Grid, TextField, Button } from '@mui/material';

// Initial State
import { INITIAL_STATE } from './initialState';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: 'none',
  borderRadius: '5px',
  pb: 5,
  px: 0,
};

const UserPageModal = ({ closeModal, openAddModal, editData }) => {
  // Always showing
  const alwaysOpen = true;
  const [data, setData] = useState(editData === null ? INITIAL_STATE : editData);

  // Error State
  const [errors, setError] = useState({});

  const handleOnChange = (e) => {
    const { value, id } = e.target;
    setData({
      ...data,
      [id]: value,
    });
  };

  const handleLogin = (e) => {
    const errorObj = {};
    Object.entries(data).map(([key, value]) => {
      if (value === '') {
        errorObj[key] = `Please enter your ${key}`;
      }
      return value;
    });
    setError(errorObj);
    if (Object.keys(data).length) {
      return false;
    }

    // Continue With Data.
    return true;
  };

  return (
    <div>
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={alwaysOpen}
        onClose={closeModal}
      >
        <Box sx={style}>
          <Box sx={{ mb: 3, px: 2, background: '#F4F4F4', display: 'flex', alignItems: 'center' }}>
            <h3> User Modal </h3>
          </Box>
          <Grid sx={{ px: 2 }} container spacing={2}>
            {Object.keys(data).map((item) => {
              const isError = Object.prototype.hasOwnProperty.call(errors, item);
              const errorText = errors[item] ? errors[item] : '';
              const itemValue = data[item] ? data[item] : '';

              return (
                <Grid key={item} item xs={12} md={6}>
                  <Box>
                    <TextField
                      id={item}
                      onChange={handleOnChange}
                      label={`Enter your ${item}`}
                      variant="outlined"
                      fullWidth
                      value={itemValue}
                      error={isError}
                      helperText={errorText}
                    />
                  </Box>
                </Grid>
              );
            })}

            <Grid item xs={12}>
              <Button onClick={handleLogin} variant="contained" fullWidth>
                Create
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default UserPageModal;
