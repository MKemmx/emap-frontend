import React from 'react';

// Material UI
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { AiOutlineCalendar } from 'react-icons/ai';
import dayjs from 'dayjs';
import EventsImage from './images/Events';

const EventModal = ({ selectedEvent, closeModal }) => {
  // Always showing
  const alwaysOpen = true;

  return (
    <Dialog width="100%" maxWidth="md" open={alwaysOpen} onClose={closeModal} scroll="paper">
      <DialogTitle> Event Details </DialogTitle>
      <DialogContent dividers>
        <Box>
          <EventsImage />
        </Box>

        <Box mb={1}>
          <Typography variant="h4" gutterBottom>
            {selectedEvent?.title}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={1}>
          <AiOutlineCalendar size={24} />

          <Box ml={1.5}>
            <Typography style={{ lineHeight: '15px' }} variant="subtitle1" mb={0} gutterBottom>
              {dayjs(selectedEvent?.start).format('LL')}
            </Typography>
            <Typography style={{ fontWeight: 500 }} variant="subtitle2" mb={0} gutterBottom>
              {dayjs(selectedEvent?.start).format('LTS')}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography gutterBottom>{selectedEvent?.description}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;
