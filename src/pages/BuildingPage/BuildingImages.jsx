import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';

const BuildingImages = ({ params }) => {
  const imagesLinks = params?.formattedValue?.map((item) => {
    return {
      original: item.url,
      thumbnail: item.url,
    };
  });

  const [isFullScreen, setIsFullScreen] = useState(false);
  useEffect(() => {
    const selectedImages = document.querySelectorAll('.image-gallery-image');
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
      }}
    >
      <ImageGallery
        onScreenChange={(fullScreen) => setIsFullScreen(fullScreen)}
        showPlayButton={false}
        showNav={false}
        items={imagesLinks}
      />
    </div>
  );
};

export default BuildingImages;
