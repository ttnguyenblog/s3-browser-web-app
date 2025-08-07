import React from 'react';
import { StorageBrowser } from './StorageBrowserConfig';

export default function App() {
  return (
    <div style={{ margin: '10vh 15vw', textAlign: 'center' }}>
      <h1>S3 Storage Browser</h1>
      <StorageBrowser />
    </div>
  );
}
