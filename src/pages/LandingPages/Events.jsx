import React, { useState } from 'react';
// Calendar
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';

// Material UI
import { Box, Skeleton, Typography, Container } from '@mui/material';

// Events Image
import EventsImage from './images/Events';
import EventModal from './EventModal';

// Hooks
import useFetch from '../../hooks/useFetch';

const localizer = dayjsLocalizer(dayjs);
const Events = () => {
  // Hook Data
  const { data, loading, error } = useFetch('event');
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (loading) {
    return (
      <Container>
        <Skeleton variant="rounded" width="100%" height="65vh" />
      </Container>
    );
  }

  const events = data?.map((item) => {
    return {
      ...item,
      start: new Date(item?.date),
      end: new Date(item?.date),
      title: item?.name,
    };
  });

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <Container>
      <Box sx={{ py: 3, width: '100%' }}>
        {data?.length <= 0 ? (
          <Box>
            <Typography mb={1} textAlign="center" variant="h4">
              No Event Data Found
            </Typography>
            <EventsImage />
          </Box>
        ) : (
          <Calendar
            onSelectEvent={(event) => {
              setSelectedEvent(event);
            }}
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 520 }}
          />
        )}
      </Box>

      {selectedEvent !== null && <EventModal selectedEvent={selectedEvent} closeModal={closeModal} />}
    </Container>
  );
};

export default Events;
