import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';

// Material UI
import { Box, Typography } from '@mui/material';

const MapImages = ({ images }) => {
  const imagesLinks = images?.map((item) => {
    return {
      original: item.url,
      thumbnail: item.url,
    };
  });

  const [isFullScreen, setIsFullScreen] = useState(false);
  useEffect(() => {
    const selectedImages = document.querySelectorAll('.image-gallery-image');
    selectedImages.forEach((item) => {
      item.classList.add('isModal');
    });
    if (isFullScreen) {
      selectedImages.forEach((item) => {
        item.classList.add('isOpen');
      });
    } else {
      selectedImages.forEach((item) => {
        item.classList.remove('isOpen');
      });
    }
  }, [isFullScreen]);

  return (
    <div
      style={{
        width: '100%',
        background: '#FFF',
        padding: '8px 15px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
        marginBottom: '1.5rem',
      }}
    >
      {imagesLinks <= 0 ? (
        <Box
          style={{
            height: '20vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          py={5}
        >
          <Typography variant="h4" textAlign="center">
            No Image Uploaded
          </Typography>
        </Box>
      ) : (
        <ImageGallery
          showPlayButton={false}
          showNav={false}
          onScreenChange={(fullScreen) => setIsFullScreen(fullScreen)}
          items={imagesLinks}
        />
      )}
    </div>
  );
};

export default MapImages;
