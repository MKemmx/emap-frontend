import React, { useState } from 'react';
import axios from 'axios';
// Material UI
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
// Hooks
import useFetch from '../../hooks/useFetch';

// Image
import DownloadImage from '../../Image/mobile-app-download.svg';

const DownloadModal = () => {
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };

  const { data, loading } = useFetch('version');
  const mobileAppDetails = loading ? null : data[0];

  const handleDownload = async () => {
    const mobileAppLinkArray = mobileAppDetails?.downloadLink.split('/');
    const googleDriveId = mobileAppLinkArray[mobileAppLinkArray.length - 2];
    const link = document.createElement('a');
    link.href = `https://drive.google.com/uc?export=download&id=${googleDriveId}`;
    link.target = '_blank';
    link.click();
    await axios.post('/download');
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} style={{ background: '#900303' }} variant="contained">
        Download
      </Button>

      <Dialog width="100%" maxWidth="lg" open={open} onClose={closeModal} scroll="paper">
        <DialogTitle> Emap Mobile Download Link </DialogTitle>
        <DialogContent dividers>
          <Box
            mb={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0 2rem',
            }}
          >
            <img
              style={{
                width: '100%',
                maxWidth: '400px',
              }}
              src={DownloadImage}
              alt="download-pic"
            />
          </Box>

          <Box mb={1}>
            <Typography mb="0" variant="h6" gutterBottom>
              Additional Information
            </Typography>

            <Typography variant="p" gutterBottom>
              Required Android OS Android 4.1 or Later.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', rowGap: '0.5rem' }}>
          <Button onClick={handleDownload} fullWidth variant="contained">
            Download Now
          </Button>
          <Button fullWidth onClick={closeModal}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DownloadModal;
