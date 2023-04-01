import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LooperContextProvider from './components/context/LooperContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LooperContextProvider>
    <App />
    </LooperContextProvider>
  </React.StrictMode>
);

