import React, { useState } from 'react';

// Material UI
import { Box, Modal, Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Axios
import axios from 'axios';

import { toast } from 'react-toastify';

// Sweet Alert
import Swal from 'sweetalert2';

// Initial State
import { INITIAL_STATE } from '../initialState';

// Component
import ImageDropZone from './ImageDropZone';

const BuildingPageModal = ({ closeModal, openAddModal, editData, reFetchData }) => {
  // Always showing
  const alwaysOpen = true;
  const [data, setData] = useState(editData === null ? INITIAL_STATE : editData);
  // const [images, setImages] = useState([]);

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
    const formData = new FormData();
    Object.entries(data).map(([key, value]) => {
      if (key === 'images') {
        value.forEach((item) => {
          formData.append('images', item);
        });
      }
      formData.append(key, value);
      return {};
    });

    try {
      await axios({
        method: openAddModal ? 'post' : 'put',
        url: openAddModal ? 'building' : `building/${editData._id}`,
        data: formData,
      });
      await reFetchData('building');
      closeModal();
      toast.success('Success new building has been added!', {
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
        <DialogTitle> Building Modal</DialogTitle>
        <DialogContent dividers>
          <Grid sx={{ px: 0 }} container spacing={2}>
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
                          display: item === 'images' ? 'none' : '',
                        }}
                        item
                        xs={12}
                        md={isDescription ? 12 : 6}
                      >
                        <Box>
                          <TextField
                            multiline={isDescription}
                            minRows={8}
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
                    </>
                  )}
                </React.Fragment>
              );
            })}

            <Grid item xs={12}>
              <ImageDropZone setData={setData} />
            </Grid>
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

export default BuildingPageModal;
