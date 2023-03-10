import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Icons
import { AiOutlineCalendar } from 'react-icons/ai';
import { MdOutlineFeedback } from 'react-icons/md';
import { BsBuilding } from 'react-icons/bs';
import { GiRoad } from 'react-icons/gi';
import { HiOutlineUserGroup } from 'react-icons/hi';

// Axios
import axios from 'axios';

// sections
import {
  // AppTasks,
  // AppNewsUpdate,
  // AppOrderTimeline,
  // AppTrafficBySite,
  // AppCurrentSubject,
  // AppConversionRates,
  AppWidgetSummary,
  AppCurrentVisits,
  AppWebsiteVisits,
} from '../../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  // Dashboard States
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    // Fetch Dashboard
    async function fetchDashboard() {
      try {
        setLoading(true);
        const { data } = await axios.get('/dashboard');
        setData(data.data);
      } catch (error) {
        console.log(error.response.data.msg);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  const handleChangeRoute = (link) => {
    navigate(`/dashboard/${link}`);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        {loading ? (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {[...new Array(6)].map((item, index) => (
              <Grid item xs={6} sm={6} md={4}>
                <Skeleton variant="rounded" width="100%" height={180} />
              </Grid>
            ))}
            <Grid item xs={8}>
              <Skeleton variant="rounded" width="100%" height={300} />
            </Grid>
            <Grid item xs={4}>
              <Skeleton variant="rounded" width="100%" height={300} />
            </Grid>
          </Grid>
        ) : (
          <>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid
                onClick={() => {
                  handleChangeRoute('user');
                }}
                item
                xs={6}
                sm={6}
                md={4}
              >
                <AppWidgetSummary
                  title="Users"
                  total={data?.adminLength}
                  color="info"
                  icon={<HiOutlineUserGroup size={24} />}
                />
              </Grid>

              <Grid
                onClick={() => {
                  handleChangeRoute('building');
                }}
                item
                xs={6}
                sm={6}
                md={4}
              >
                <AppWidgetSummary
                  title="Buildings"
                  total={data?.buildingLength}
                  color="warning"
                  icon={<BsBuilding size={24} />}
                />
              </Grid>

              <Grid
                onClick={() => {
                  handleChangeRoute('room');
                }}
                item
                xs={6}
                sm={6}
                md={4}
              >
                <AppWidgetSummary
                  title="Rooms"
                  total={data?.roomLength}
                  color="error"
                  icon={<BsBuilding size={24} />}
                />
              </Grid>

              <Grid
                onClick={() => {
                  handleChangeRoute('event');
                }}
                item
                xs={6}
                sm={6}
                md={4}
              >
                <AppWidgetSummary
                  title="Events"
                  total={data?.eventLength}
                  color="info"
                  icon={<AiOutlineCalendar size={24} />}
                />
              </Grid>

              <Grid
                onClick={() => {
                  handleChangeRoute('feedback');
                }}
                item
                xs={6}
                sm={6}
                md={4}
              >
                <AppWidgetSummary
                  title="Feedbacks"
                  total={data?.feedbackLength}
                  color="warning"
                  icon={<MdOutlineFeedback size={24} />}
                />
              </Grid>

              <Grid
                onClick={() => {
                  handleChangeRoute('audit-trail');
                }}
                item
                xs={6}
                sm={6}
                md={4}
              >
                <AppWidgetSummary
                  title="Audit Trails"
                  total={data?.auditTrailLength}
                  color="error"
                  icon={<GiRoad size={24} />}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={8}>
                <AppWebsiteVisits
                  title="Download Analytics"
                  // subheader="(+43%) than last year"
                  chartLabels={[
                    '01/01/2023',
                    '02/01/2023',
                    '03/01/2023',
                    '04/01/2023',
                    '05/01/2023',
                    '06/01/2023',
                    '07/01/2023',
                    '08/01/2023',
                    '09/01/2023',
                    '10/01/2023',
                    '11/01/2023',
                  ]}
                  chartData={[
                    {
                      name: 'Team A',
                      type: 'column',
                      fill: 'solid',
                      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                    },
                    {
                      name: 'Team B',
                      type: 'area',
                      fill: 'gradient',
                      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                    },
                    {
                      name: 'Team C',
                      type: 'line',
                      fill: 'solid',
                      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                    },
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="Current Visits"
                  chartData={[
                    { label: 'America', value: 4344 },
                    { label: 'Asia', value: 5435 },
                    { label: 'Europe', value: 1443 },
                    { label: 'Africa', value: 4443 },
                  ]}
                  chartColors={[
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                  ]}
                />
              </Grid>

              {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid> */}

              {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}

              {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid> */}

              {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
            </Grid>
          </>
        )}
      </Container>
    </>
  );
}
