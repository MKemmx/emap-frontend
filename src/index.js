import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Map Box CSS
import 'mapbox-gl/dist/mapbox-gl.css';

// Axios
import axios from 'axios';

// Components
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

// ----------------------------------------------------------------------
const root = ReactDOM.createRoot(document.getElementById('root'));

// Setting Default Headers
// const API_URL_LOCAL = 'http://localhost:5000/api/';
const API_URL_PRODUCTION = 'https://emap-back-end.onrender.com/api/';

const LS_TOKEN = JSON.parse(localStorage.getItem('emap-auth')).state.token;
//! Adding Axios Defaults
axios.defaults.baseURL = API_URL_PRODUCTION;
axios.defaults.headers.common['auth-token'] = LS_TOKEN;

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
