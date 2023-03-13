import React from 'react';

// Material UI
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import MapImages from './MapImages';

const MapDetail = ({ selectedMarker, closeModal }) => {
  // Always showing
  const alwaysOpen = true;
  return (
    <Dialog fullWidth="md" maxWidth="md" width="100%" open={alwaysOpen} onClose={closeModal} scroll="paper">
      <DialogTitle> {selectedMarker?.buildingId?.name} </DialogTitle>
      <DialogContent dividers>
        <Box>
          <MapImages images={selectedMarker.buildingId.images} />
        </Box>
        <Box>
          <Typography gutterBottom>{selectedMarker?.buildingId?.description}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MapDetail;
