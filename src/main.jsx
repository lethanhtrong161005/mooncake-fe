import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/lucian-tokens.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { VerificationNotificationProvider } from './context/VerificationNotificationContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <VerificationNotificationProvider>
        <App />
      </VerificationNotificationProvider>
    </AuthProvider>
  </StrictMode>,
);
