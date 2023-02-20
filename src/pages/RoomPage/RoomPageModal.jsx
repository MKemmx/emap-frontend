import React, { useState, useEffect } from 'react';

// Material UI
import {
  Box,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Axios
import axios from 'axios';
import { toast } from 'react-toastify';

// Initial State
import { INITIAL_STATE } from './initialState';

// Rest
import { getAllBuilding } from '../../rest/building';

const RoomPageModal = ({ closeModal, openAddModal, editData, reFetchData }) => {
  // Always showing
  const alwaysOpen = true;
  const [data, setData] = useState(editData === null ? INITIAL_STATE : editData);
  const [loading, setLoading] = useState(false);

  // Building Menu
  const [buildingMenu, setBuildingMenu] = useState([]);
  const [selectedBuildingIndex, setSelectedBuildingIndex] = useState(null);

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
        url: openAddModal ? 'room' : `room/${editData._id}`,
        data,
      });
      await reFetchData('room');
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

  useEffect(() => {
    async function fetchBuildingMenu() {
      const buildingOptions = await getAllBuilding();
      setBuildingMenu(buildingOptions);

      if (editData !== null) {
        const shit = buildingOptions.map((item, index) => {
          if (item._id === editData.buildingId._id) {
            setSelectedBuildingIndex(index);
          }
          return item;
        });
      }
    }
    fetchBuildingMenu();
  }, []);

  return (
    <>
      <Dialog open={alwaysOpen} onClose={closeModal} scroll="body">
        <DialogTitle> Building Coordinate Modal </DialogTitle>
        <DialogContent dividers>
          {buildingMenu.length <= 0 ? (
            <Box
              sx={{
                width: 480,
                minHeight: '20vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid sx={{ px: 0 }} container spacing={2}>
              <Grid item xs={12}>
                <Box>
                  <Autocomplete
                    disabled={!!editData}
                    onChange={(event, value) => {
                      buildingMenu.forEach((item, index) => {
                        if (value._id === item._id) {
                          setSelectedBuildingIndex(index);
                        }
                      });

                      setData({
                        ...data,
                        buildingId: value._id,
                      });
                    }}
                    value={buildingMenu[selectedBuildingIndex] ? buildingMenu[selectedBuildingIndex] : null}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    disablePortal
                    options={buildingMenu}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Select building" />}
                  />
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
                            display: item === 'buildingId' ? 'none' : '',
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
                              label={`Enter room ${item}`}
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
          )}
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

export default RoomPageModal;
