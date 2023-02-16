import React from 'react';

import { Button, Box } from '@mui/material/';
import { homeStyle } from './landingPageStyle.ts';
import HomeBannerImage from './images/HomeImage';

const Home = () => {
  return (
    <Box
      sx={{
        ...homeStyle,
      }}
    >
      <Box
        sx={{
          flex: 1,
        }}
      >
        <h1
          style={{
            marginBottom: '25px',
          }}
        >
          CAMPUS ON YOUR HANDS
        </h1>
        <p
          style={{
            marginBottom: '25px',
          }}
        >
          An app wherein EVSU students, employees, and visitors can track their location, browse over the directories of
          the evsu main campus and trace possible routes to their destination inside the university.
        </p>
        <Button style={{ background: '#900303' }} variant="contained">
          Download
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
        }}
      >
        <HomeBannerImage />
      </Box>
    </Box>
  );
};

export default Home;
