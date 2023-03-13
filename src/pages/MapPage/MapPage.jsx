import React, { useRef, useState } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import Map, { NavigationControl, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Icons
import { FaMapMarkerAlt } from 'react-icons/fa';
import MapDetail from './MapDetail';

// React Hooks
import useFetch from '../../hooks/useFetch';

const MapPage = () => {
  const mapRef = useRef(null);
  const handleMapLoad = () => {
    const map = mapRef.current.getMap();
    const layers = map.getStyle().layers;
    layers.forEach((layer) => {
      if (layer.type === 'symbol') {
        map.removeLayer(layer.id);
      }
    });
  };

  const { data, loading, error } = useFetch('buildingCoordinate');
  const [selectedMarker, setSelectedMarker] = useState(null);
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };
  const closeModal = () => {
    setSelectedMarker(null);
  };

  if (loading) {
    return (
      <Box py={5} sx={{ width: '100%', height: '85vh' }}>
        <Skeleton variant="rounded" width="100%" height="100%" />
      </Box>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Something went wrong....</h1>
      </div>
    );
  }

  return (
    <Box py={5} sx={{ width: '100%', height: '85vh' }}>
      <Map
        mapboxAccessToken="pk.eyJ1Ijoia2NwaGlsaXAiLCJhIjoiY2w3Njk4NmZwMXltMTNucng1czdhMGo0aiJ9.rsKrbG0IARxPZrUfSqSrKA"
        initialViewState={{
          longitude: 124.997452,
          latitude: 11.2400601,
          container: 'map',
          center: [120.997382, 11.240103],
          zoom: 18,
          tilt: 80,
          pitch: 60,
          bearing: 180,
        }}
        style={{ width: '100%', minHeight: '500px', height: '100%' }}
        mapStyle="mapbox://styles/chryzxc/cjou70fxh5cwm2rn09outswx2"
        onLoad={handleMapLoad}
        ref={mapRef}
      >
        {data?.map((marker) => {
          return (
            <Marker key={marker?.buildingId?.name} latitude={marker.latitude} longitude={marker.longitude}>
              <Box
                onClick={() => handleMarkerClick(marker)}
                display="flex"
                justfiycontent="center"
                alignItems="center"
                flexDirection="column"
              >
                <FaMapMarkerAlt color="#900303" width={18} size={18} />
                <Typography variant="subtitle2"> {marker?.buildingId?.name} </Typography>
              </Box>
            </Marker>
          );
        })}

        <div style={{ position: 'absolute', right: 10, top: 10 }}>
          <NavigationControl />
        </div>
      </Map>
      {selectedMarker !== null && <MapDetail selectedMarker={selectedMarker} closeModal={closeModal} />}
    </Box>
  );
};

export default MapPage;
