import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Button,
  Toolbar,
  ListItemText,
  ListItemButton,
  ListItem,
  List,
  IconButton,
  Drawer,
  Divider,
  CssBaseline,
  Box,
  AppBar,
} from '@mui/material/';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Outlet, useNavigate } from 'react-router-dom';

// State
import { useLoginStore } from '../../store/loginStore';

const drawerWidth = 240;
const navItems = ['Home', 'Events', 'About', 'Map'];

function LandingPageLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleChangeRoute = (route) => {
    navigate(`/${route}`);
  };

  // Check if Logged In
  const { isAuthenticated } = useLoginStore((state) => state);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard/app');
    }
  }, [isAuthenticated]);

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '50%' }}
          src="./assets/evsu-logos/emap-logo.png"
          alt="emap-logo"
        />
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            onClick={() => {
              handleChangeRoute(item);
            }}
            key={item}
            disablePadding
          >
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      {!isAuthenticated && (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          {/* App Bar */}
          <AppBar>
            <Toolbar sx={{ background: '#900303', height: '8vh' }}>
              <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box
                  component="div"
                  sx={{ py: 1, marginRight: { xs: 'auto', sm: 'unset' }, display: { xs: 'block', sm: 'block' } }}
                >
                  <img
                    style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '50%' }}
                    src="./assets/evsu-logos/evsu-rounded-logo.png"
                    alt="evsu-rounded-logo"
                  />
                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {navItems.map((item) => (
                    <Button
                      onClick={(e) => {
                        handleChangeRoute(item);
                      }}
                      key={item}
                      sx={{ color: '#fff' }}
                    >
                      {item}
                    </Button>
                  ))}
                </Box>
              </Container>

              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: 'none' } }}
              >
                <RxHamburgerMenu />
              </IconButton>
            </Toolbar>
          </AppBar>
          {/* Content */}
          <Box width="100%">
            <Box>
              <Box component="nav">
                <Drawer
                  container={container}
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true,
                  }}
                  sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                  }}
                >
                  {drawer}
                </Drawer>
              </Box>
              <Box
                component="main"
                sx={{
                  px: 2,
                  mt: '77px',
                  mb: 2,
                  minHeight: '85vh',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Outlet />
              </Box>
            </Box>
            <Box
              sx={{ py: 2, background: '#900303', color: '#FFF', height: '7vh', display: 'flex', alignItems: 'center' }}
            >
              <Container>&#169; 2023 eMap. </Container>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

LandingPageLayout.propTypes = {
  window: PropTypes.func,
};

export default LandingPageLayout;
