import React from 'react';

import { Typography, Box } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ py: 1, width: '100%' }}>
      <Box
        sx={{
          pb: 2,
        }}
      >
        <img
          style={{
            width: '100%',
            objectFit: 'contain',
            maxHeight: '35vh',
          }}
          src="https://tribune.net.ph/wp-content/uploads/2022/11/Untitled-1-copy-101-1920x1080.jpg"
          alt="about"
        />
      </Box>

      <Box
        sx={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          mb: 2,
        }}
      >
        About
        <Typography sx={{ mb: 3 }}>
          The Eastern Visayas State University – Tacloban Campus is a huge campus – which simply suggests that it is
          more confusing and complicated with regards to the rooms, buildings, etc inside the university. Many of the
          freshmen students in their first day of school are not aware of the venue of their classes since they are
          still incognizant of the establishments along the school vicinity. Thus, this becomes a reason for them not to
          attend their classes anymore.
        </Typography>
        <Typography sx={{ mb: 3 }}>
          The proponents believe that through the “eMap: Mobile Map Directory of Eastern Visayas State University (EVSU)
          – Tacloban Campus with Web-Based Management Panel”, we can lessen or even give an end to this problem. This
          mobile app is basically a map, wherein you can track your current location, browse over the directories of the
          campus and trace possible routes to your destination inside the university. And to satisfy the users more, we
          added the News and Updates feature, to keep them updated of the latest events and happenings in the
          university.
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
