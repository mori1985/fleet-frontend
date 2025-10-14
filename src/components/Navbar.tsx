import React from 'react';
  import { AppBar, Toolbar, Typography, Button } from '@mui/material';
  import { DirectionsCar } from '@mui/icons-material';
  import { useNavigate } from 'react-router-dom'; // نصب react-router-dom اگر نداری

  const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <DirectionsCar sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fleet Manager
          </Typography>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate('/reports')}>Reports</Button>
          <Button color="inherit" onClick={() => navigate('/maps')}>Live Maps</Button>
          <Button color="inherit" onClick={() => navigate('/performance')}>Performance</Button>
          <Button color="inherit" onClick={() => navigate('/data-entry')}>Data Entry</Button>
        </Toolbar>
      </AppBar>
    );
  };

  export default Navbar;