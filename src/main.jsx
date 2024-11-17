import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import Google OAuth Provider
import App from './App.jsx';
import './index.css';

// Replace with your actual Google Client ID
const clientId = 'YOUR_GOOGLE_CLIENT_ID';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
