import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { Box, ListItemText } from '@mui/material';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Styles
import { StyledNavItem, StyledNavItemIcon, activeNavItem } from '../styles';

NavItem.propTypes = {
  item: PropTypes.object,
};

export default function NavItem({ item }) {
  const { pathname } = useLocation();
  const { title, path, icon, info, children } = item;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!children) return;
    setIsOpen(!isOpen);
  };

  // Style Checker if Active
  const isActiveStyle = path === pathname ? activeNavItem : {};

  return (
    <>
      <StyledNavItem
        onClick={handleOpen}
        component={RouterLink}
        to={path}
        sx={{
          ...isActiveStyle,
          color: '#FFF',
        }}
      >
        <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
        <ListItemText disableTypography primary={title} />
        {info && info}
        {children && <Box sx={{ pr: 1 }}>{isOpen ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}</Box>}
      </StyledNavItem>

      {isOpen && (
        <>
          {children?.map((item) => (
            <Box key={item.title} sx={{ pl: 3 }}>
              <NavItem item={item} />
            </Box>
          ))}
        </>
      )}
    </>
  );
}
