import React from 'react';
     import { Routes, Route, useLocation } from 'react-router-dom';
     import { CssBaseline, ThemeProvider } from '@mui/material';
     import theme from './theme/theme';
     import Dashboard from './Dashboard';

     function App() {
       const location = useLocation(); // برای رفرش تم با تغییر مسیر

       return (
         <ThemeProvider theme={theme}>
           <CssBaseline />
           <Routes location={location} key={location.pathname}>
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/reports" element={<div>Reports Page (Under Construction)</div>} />
             <Route path="/maps" element={<div>Live Maps Page (Under Construction)</div>} />
             <Route path="/performance" element={<div>Performance Page (Under Construction)</div>} />
             <Route path="/data-entry" element={<div>Data Entry Page (Under Construction)</div>} />
             <Route path="*" element={<Dashboard />} />
           </Routes>
         </ThemeProvider>
       );
     }

     export default App;