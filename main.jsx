if (typeof crypto.randomUUID !== 'function') {
  crypto.randomUUID = function () {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  };
}

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { StorageBrowser } from './StorageBrowserConfig';

import '@aws-amplify/ui-react-storage/styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StorageBrowser.Provider>
      <App />
    </StorageBrowser.Provider>
  </React.StrictMode>
)
