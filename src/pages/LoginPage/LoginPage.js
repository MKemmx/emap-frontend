import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider, Stack, Button, Box, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Hooks
import useResponsive from '../../hooks/useResponsive';

// sections
import { LoginForm } from '../../sections/auth/login';

// Store
import { useLoginStore } from '../../store/loginStore';

// ----------------------------------------------------------------------
const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: '#900303',
  padding: theme.spacing(4, 0),
  // backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const navigate = useNavigate();
  const mdUp = useResponsive('up', 'md');

  const { isAuthenticated } = useLoginStore((state) => state);

  // Check if is Authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <img
              style={{ width: '85%', objectFit: 'contain', display: 'block', marginInline: 'auto' }}
              src="/assets/evsu-logos/evsu-logo-slogan-white.png"
              alt="emap-logo"
            />

            <Box sx={{ px: 5, mt: 12, textAlign: 'center', color: '#FFF' }}>
              <Typography variant="h3">Hi, Welcome Back</Typography>
              <Typography variant="p" sx={{ px: 5, padding: 0 }}>
                This is the admin page for the Evsu Emap System
              </Typography>

              <Box sx={{ mt: 4, background: '#ab0909', padding: '20px 30px', borderRadius: '20px' }}>
                <img src="/assets/evsu-images/login-banner.svg" alt="login-banner" />
              </Box>
            </Box>

            <Box sx={{ mt: 'auto' }}>
              <Typography variant="p" sx={{ px: 5, padding: 0, color: '#FFF', mb: 3 }}>
                &copy; Emap Evsu 2023. All rights reserved.
              </Typography>
            </Box>
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Card sx={{ px: 5, py: 6 }}>
              {/* <Typography variant="h4" gutterBottom>
                Sign in to continue
              </Typography> */}
              <img
                style={{ width: '70px', display: 'block', marginInline: 'auto' }}
                src="/assets/evsu-logos/emap-logo.png"
                alt="emap-logo"
              />
              <LoginForm />
            </Card>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
