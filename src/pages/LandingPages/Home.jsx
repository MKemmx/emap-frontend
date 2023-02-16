import React from 'react';

import { Button, Box } from '@mui/material/';
import { homeStyle } from './landingPageStyle.ts';

const Home = () => {
  return (
    <Box sx={homeStyle}>
      <div>
        <h2> CAMPUS ON YOUR HANDS </h2>
        <p>
          An app wherein EVSU students, employees, and visitors can track their location, browse over the directories of
          the evsu main campus and trace possible routes to their destination inside the university.
        </p>

        <Button variant="contained">Download</Button>
      </div>
      <div>
        <img src="https://m-cdn.phonearena.com/images/phones/83157-350/Samsung-Galaxy-S22.jpg" alt="mobile-home-pic" />
      </div>
    </Box>
  );
};

export default Home;
