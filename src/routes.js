import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LandingPageLayout from './layouts/landingPage';

// Auth Page and Fallback
import LoginPage from './pages/LoginPage/LoginPage';
import Page404 from './pages/Page404/Page404';

// Admin Route Pages
import DashboardAppPage from './pages/DashboardAppPage/DashboardAppPage';
import UserPage from './pages/UserPage/UserPage';
import EventPage from './pages/EventPage/EventPage';
import FeedbackPage from './pages/FeedbackPage/FeedbackPage';
import BuildingPage from './pages/BuildingPage/BuildingPage';
import BuildingCoordinatePage from './pages/BuildingCoordinatePage/BuildingCoordinatePage';
import RoomPage from './pages/RoomPage/RoomPage';
import RoomCoordinatePage from './pages/RoomCoordinatePage/RoomCoordinatePage';
import AuditTrailPage from './pages/AuditTrailPage/AuditTrailPage';
import MapPage from './pages/MapPage/MapPage';
import AppVersion from './pages/AppVersionPage/AppVersionPage';
import Settings from './pages/Settings/Settings';

// Landing Page
import Home from './pages/LandingPages/Home';
import Events from './pages/LandingPages/Events';
import About from './pages/LandingPages/About';

// ----------------------------------------------------------------------
export default function Router() {
  const routes = useRoutes([
    //! Emap Home Landing Page
    {
      element: <LandingPageLayout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: 'home', element: <Home /> },
        { path: 'events', element: <Events /> },
        { path: 'about', element: <About /> },
        { path: 'map', element: <MapPage /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    //! Admin Routes
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/d ashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'event', element: <EventPage /> },
        { path: 'feedback', element: <FeedbackPage /> },
        { path: 'building', element: <BuildingPage /> },
        { path: 'building-coordinate', element: <BuildingCoordinatePage /> },
        { path: 'room', element: <RoomPage /> },
        { path: 'room-coordinate', element: <RoomCoordinatePage /> },
        { path: 'audit-trail', element: <AuditTrailPage /> },
        { path: 'map', element: <MapPage /> },
        { path: 'version', element: <AppVersion /> },
        { path: 'settings', element: <Settings /> },
      ],
    },
    //! Auth Routes
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
  return routes;
}
