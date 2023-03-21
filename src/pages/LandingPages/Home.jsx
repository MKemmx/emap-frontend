import React from 'react';

import { Box, Typography, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Components
import DownloadModal from './DownloadModal';
// import { homeStyle } from './landingPageStyle.ts';
import HomeBannerImage from './images/HomeImage';

const Home = () => {
  const theme = useTheme();

  return (
    <Container>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          height: '100%',
          [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
          },
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{
              marginBottom: '5px',
              [theme.breakpoints.down('md')]: {
                marginBottom: '5px',
              },
            }}
          >
            CAMPUS ON YOUR HANDS
          </Typography>
          <Typography
            variant="body2"
            sx={{
              marginBottom: '15px',
              [theme.breakpoints.down('md')]: {
                marginBottom: '5px',
              },
            }}
          >
            An app wherein EVSU students, employees, and visitors can track their location, browse over the directories
            of the evsu main campus and trace possible routes to their destination inside the university.
          </Typography>
          {/* <Button onClick={handleDownload} style={{ background: '#900303' }} variant="contained">
            Download
          </Button> */}
          <DownloadModal />
        </Box>
        <Box
          sx={{
            [theme.breakpoints.down('md')]: {
              width: '500px',
              marginInline: 'auto',
            },
            [theme.breakpoints.down('sm')]: {
              width: '95%',
              marginInline: 'auto',
            },
          }}
        >
          <HomeBannerImage />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
