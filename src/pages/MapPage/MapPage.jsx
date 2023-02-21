import React from 'react';

import { Box } from '@mui/material';
import Map from '!react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapPage = () => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Map
        mapboxAccessToken="pk.eyJ1Ijoia2NwaGlsaXAiLCJhIjoiY2w3Njk4NmZwMXltMTNucng1czdhMGo0aiJ9.rsKrbG0IARxPZrUfSqSrKA"
        initialViewState={{
          longitude: 124.99724,
          latitude: 11.24052,
          zoom: 17,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </Box>
  );
};

export default MapPage;
