import React, { useState } from 'react';
// Material UI
import { Box, Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';

// React tostify
import { toast } from 'react-toastify';

// Initial State
import { INITIAL_STATE } from './initialState';

const UserPageModal = ({ closeModal, openAddModal, editData, reFetchData }) => {
  // Always showing
  const alwaysOpen = true;
  const [data, setData] = useState(editData === null ? INITIAL_STATE : editData);
  const [loading, setLoading] = useState(false);
  const [errorResponse, setErrorResponse] = useState(null);

  // Error State
  const [errors, setError] = useState({});
  const handleOnChange = (e) => {
    const { value, id } = e.target;
    setData({
      ...data,
      [id]: value,
    });
  };

  const handleValidate = async (e) => {
    const errorObj = {};
    Object.entries(data).map(([key, value]) => {
      if (value === '') {
        errorObj[key] = `Please enter your ${key}`;
      }
      return value;
    });
    setError(errorObj);
    return errorObj;
  };

  const handleCreateOrUpdate = async () => {
    const errorObject = await handleValidate();

    // Check if input has any errors
    if (Object.keys(errorObject).length >= 1) {
      return setErrorResponse('Input fields has some errors');
    }

    // Handling Create or Update request
    setLoading(true);
    try {
      await axios({
        method: openAddModal ? 'post' : 'put',
        url: openAddModal ? 'admin' : `admin/${editData._id}`,
        data,
      });
      await reFetchData('admin');
      closeModal();
      toast.success(`${data?.firstName} has been ${openAddModal ? 'added' : 'updated'}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      setErrorResponse(error.response.data.msg);
    } finally {
      setLoading(false);
    }
    return 'Create or Update Function';
  };

  return (
    <Dialog open={alwaysOpen} onClose={closeModal} scroll="body">
      <DialogTitle> User Modal </DialogTitle>
      <DialogContent dividers>
        {errorResponse !== null && (
          <Alert severity="error">
            <p> {errorResponse} </p>
          </Alert>
        )}

        <Grid mt={1} sx={{ px: 0 }} container spacing={2}>
          {Object.keys(data).map((item) => {
            const isError = Object.prototype.hasOwnProperty.call(errors, item);
            const errorText = errors[item] ? errors[item] : '';
            const itemValue = data[item] ? data[item] : '';

            // Check if desciption
            const isDescription = item === 'description';

            return (
              <React.Fragment key={item}>
                {item === '_id' || item === 'createdAt' ? null : (
                  <>
                    <Grid
                      sx={{
                        display: item === 'date' ? 'none' : '',
                      }}
                      item
                      xs={12}
                      md={6}
                    >
                      <Box>
                        <TextField
                          multiline={isDescription}
                          minRows={8}
                          id={item}
                          onChange={handleOnChange}
                          label={`Enter ${item}`}
                          variant="outlined"
                          fullWidth
                          value={itemValue}
                          error={isError}
                          helperText={errorText}
                        />
                      </Box>
                    </Grid>
                  </>
                )}
              </React.Fragment>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <LoadingButton loading={loading} variant="contained" onClick={handleCreateOrUpdate}>
          {openAddModal ? 'Save' : 'Update '}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default UserPageModal;
