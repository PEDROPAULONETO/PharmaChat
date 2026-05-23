import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { LandingPage } from './app/pages/LandingPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>,
);
