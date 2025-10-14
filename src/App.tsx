import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './Dashboard';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<div>Reports Page (Under Construction)</div>} />
        <Route path="/maps" element={<div>Live Maps Page (Under Construction)</div>} />
        <Route path="/performance" element={<div>Performance Page (Under Construction)</div>} />
        <Route path="/data-entry" element={<div>Data Entry Page (Under Construction)</div>} />
        <Route path="*" element={<Dashboard />} /> {/* Default to Dashboard */}
      </Routes>
    </React.Fragment>
  );
}

export default App;