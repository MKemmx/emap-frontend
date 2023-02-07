import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, List } from '@mui/material';

// Components
import NavItem from './children/NavItem';

// ----------------------------------------------------------------------
NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}
