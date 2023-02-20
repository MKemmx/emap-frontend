import React, { useState } from 'react';

// Material UI
import { Box, Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Date Picker
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Axios
import axios from 'axios';
import { toast } from 'react-toastify';

// Initial State
import { INITIAL_STATE } from './initialState';

const EventPageModal = ({ closeModal, openAddModal, editData, reFetchData }) => {
  // Always showing
  const alwaysOpen = true;
  const [data, setData] = useState(editData === null ? INITIAL_STATE : editData);
  const [loading, setLoading] = useState(false);

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
      return toast.error('Input fields has some errors', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    // Handling Create or Update request
    setLoading(true);
    try {
      await axios({
        method: openAddModal ? 'post' : 'put',
        url: openAddModal ? 'event' : `event/${editData._id}`,
        data,
      });
      await reFetchData('event');
      closeModal();
      toast.success('Success building coordinate has been added!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error.response.data.msg);
      toast.error(`Something went wrong!`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
    return 'Create or Update Function';
  };

  return (
    <>
      <Dialog open={alwaysOpen} onClose={closeModal} scroll="body">
        <DialogTitle> Building Modal </DialogTitle>
        <DialogContent dividers>
          <Grid sx={{ px: 0 }} container spacing={2}>
            <Grid item xs={12}>
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Event date"
                    id="date"
                    value={data?.date}
                    onChange={(newValue) => {
                      setData({
                        ...data,
                        date: newValue,
                      });
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>

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
                      >
                        <Box>
                          <TextField
                            multiline={isDescription}
                            minRows={8}
                            id={item}
                            onChange={handleOnChange}
                            label={`Event ${item}`}
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
    </>
  );
};

export default EventPageModal;
