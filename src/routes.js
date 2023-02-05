import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LandingPageLayout from './layouts/landingPage';

// Unused Routes
// import BlogPage from './pages/BlogPage';
// import ProductsPage from './pages/ProductsPage';

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

// Landing Page

// ----------------------------------------------------------------------
export default function Router() {
  const routes = useRoutes([
    //! Admin Routes
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
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
      ],
    },
    //! Auth Routes
    {
      path: 'login',
      element: <LoginPage />,
    },
    //! Emap Home Landing Page
    {
      element: <LandingPageLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
  return routes;
}
