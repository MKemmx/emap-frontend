import React, { useState, useEffect } from 'react';

// Material UI
import { Box, Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import axios from 'axios';

// Sweet Alert
import Swal from 'sweetalert2';

// Initial State
import { INITIAL_STATE } from './initialState';

// Hooks
import useFetch from '../../hooks/useFetch';

// styles
import { modalStyle } from './styles';

const UserPageModal = ({ closeModal, openAddModal, editData, reFetchData }) => {
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
      return Swal.fire('Error', `input fields has some errors`, 'error');
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
      Swal.fire('Success', `${data?.firstName} has been ${openAddModal ? 'added' : 'updated'}`, 'success');
    } catch (error) {
      console.log(error.response.data.msg);
      Swal.fire('Fail', `something went wrong`, 'error');
    } finally {
      setLoading(false);
    }
    return 'Create or Update Function';
  };

  return (
    // <div>
    //   <Modal
    //     aria-labelledby="modal-modal-title"
    //     aria-describedby="modal-modal-description"
    //     open={alwaysOpen}
    //     onClose={closeModal}
    //   >
    //     <Box sx={modalStyle}>
    //       <Box sx={{ mb: 3, px: 2, py: 2.5, background: '#F4F4F4', display: 'flex', alignItems: 'center' }}>
    //         <h3> User Modal </h3>
    //       </Box>
    //       <Grid sx={{ px: 2 }} container spacing={2}>
    //         {Object.keys(data).map((item) => {
    //           const isError = Object.prototype.hasOwnProperty.call(errors, item);
    //           const errorText = errors[item] ? errors[item] : '';
    //           const itemValue = data[item] ? data[item] : '';

    //           return (
    //             <React.Fragment key={item}>
    //               {item === '_id' || item === 'createdAt' ? null : (
    //                 <Grid item xs={12} md={6}>
    //                   <Box>
    //                     <TextField
    //                       id={item}
    //                       onChange={handleOnChange}
    //                       label={`Enter your ${item}`}
    //                       variant="outlined"
    //                       fullWidth
    //                       value={itemValue}
    //                       error={isError}
    //                       helperText={errorText}
    //                     />
    //                   </Box>
    //                 </Grid>
    //               )}
    //             </React.Fragment>
    //           );
    //         })}

    //         <Grid item xs={12}>
    //           {loading ? (
    //             <div> Loading... </div>
    //           ) : (
    //             <Button onClick={handleCreateOrUpdate} variant="contained" fullWidth>
    //               {openAddModal ? 'Create' : 'Update '}
    //             </Button>
    //           )}
    //         </Grid>
    //       </Grid>
    //     </Box>
    //   </Modal>
    // </div>

    <Dialog open={alwaysOpen} onClose={closeModal} scroll="body">
      <DialogTitle> User Modal </DialogTitle>
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
