import React from 'react';

import { Box } from '@mui/system';

// Events Image
import EventsImage from './images/Events';

const Events = () => {
  return (
    <>
      <Box sx={{ py: 3 }}>
        <EventsImage />

        {/* Events Data */}
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            py: 5,
          }}
        >
          <h3> No Data yet</h3>
        </Box>
      </Box>
    </>
  );
};

export default Events;
