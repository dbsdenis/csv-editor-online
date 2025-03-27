import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

// Get the root element
const rootElement = document.getElementById('root');

// Create a root
if (rootElement) {
  const root = createRoot(rootElement);
  
  // Render your app
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

serviceWorker.register();