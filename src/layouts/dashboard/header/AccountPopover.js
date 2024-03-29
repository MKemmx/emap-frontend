import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';

// React Router Dom
import { useNavigate } from 'react-router-dom';

// Store
import { useLoginStore } from '../../../store/loginStore';

// ----------------------------------------------------------------------
const MENU_OPTIONS = [
  {
    label: 'Dashboard',
    icon: 'eva:home-fill',
    link: 'app',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    link: 'settings',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  // Store States
  const { logout, user } = useLoginStore((state) => state);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleRoute = (routeLink) => {
    console.log(routeLink);
    navigate(`/dashboard/${routeLink}`);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar
          sx={{
            background: '#900303',
          }}
        >
          {user?.firstName[0].toUpperCase()}
          {user?.lastName[0].toUpperCase()}
        </Avatar>
        {/* <Avatar src="https://www.pngmart.com/files/21/Admin-Profile-PNG-Isolated-Pic.png" alt="photoURL" /> */}
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.userName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              onClick={() => {
                // handleClose();
                handleRoute(option.link);
              }}
              key={option.label}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={logout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
