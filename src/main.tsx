import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { GarageProvider } from './context/CarContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GarageProvider>
    <App />
  </GarageProvider>,
);
