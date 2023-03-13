import React from 'react';
// Material UI
import { Container, Grid, Box, Typography, Tabs, Tab } from '@mui/material';
import dayjs from 'dayjs';

// Global State
import { useLoginStore } from '../../store/loginStore';
import PasswordPanel from './Children/PasswordPanel';
import UserInfo from './Children/UserInfo';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Settings() {
  const { user } = useLoginStore((state) => state);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Grid gx={2} container>
        <Grid p={1} w="100%" item xs={12} md={4}>
          <Box boxShadow={2} sx={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: 1 }}>
            <Typography mb={0} textAlign="center" variant="h6" gutterBottom>
              {`${user?.firstName} ${user?.middleName} ${user?.lastName}`}
            </Typography>
            <Typography textAlign="center" mb={2} variant="subtitle2">
              {`${user?.email}`}
            </Typography>
            <img
              style={{ width: '100px', display: 'block', marginInline: 'auto' }}
              src="http://cdn.onlinewebfonts.com/svg/img_208097.png"
              alt=""
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <p>Created:</p>
              <Typography ml={1} textAlign="center" variant="subtitle2">
                {dayjs().format('L')}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid p={1} w="100%" item xs={12} md={8}>
          <Box boxShadow={2} sx={{ backgroundColor: '#FFF', borderRadius: 1 }}>
            {/* Header */}
            <Box sx={{ backgroundColor: 'rgb(248,249,251)' }}>
              <Box sx={{ padding: '2rem 1.5rem 0.5rem 1.5rem' }}>
                <Typography mb={0} pb={0} variant="h5">
                  Update Account Profile
                </Typography>
              </Box>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', margin: '0rem 1.5rem' }}>
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="User Info" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
                  <Tab label="Password Info" id="simple-tab-2" aria-controls="simple-tabpanel-2" />
                </Tabs>
              </Box>
            </Box>
            {/* Content */}
            <TabPanel value={value} index={0}>
              <UserInfo />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PasswordPanel />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
