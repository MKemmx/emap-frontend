import React from 'react';

// Material UI
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import EventsImage from '../LandingPages/images/Events';

const MapDetail = ({ selectedMarker, closeModal }) => {
  // Always showing
  const alwaysOpen = true;

  return (
    <Dialog width="100%" maxWidth="md" open={alwaysOpen} onClose={closeModal} scroll="paper">
      <DialogTitle> {selectedMarker.name} </DialogTitle>
      <DialogContent dividers>
        <Box>
          <EventsImage />
        </Box>
        <Box>
          <Typography gutterBottom>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum modi impedit hic doloremque natus accusamus
            iusto, laudantium quod dolore error?
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MapDetail;
