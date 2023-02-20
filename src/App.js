// Toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

// Custom CSS
import './App.css';

// ----------------------------------------------------------------------
export default function App() {
  return (
    <ThemeProvider>
      <ToastContainer />
      <ScrollToTop />
      <StyledChart />
      <Router />
    </ThemeProvider>
  );
}
