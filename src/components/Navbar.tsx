// Navbar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { DirectionsCar } from '@mui/icons-material';

interface NavbarProps {
  onNavigate: (id: string) => void; // وقتی روی منو کلیک شد، اسکرول به بخش مربوطه
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <DirectionsCar sx={{ mr: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Fleet Dashboard
        </Typography>
        <Button color="inherit" onClick={() => onNavigate('dashboard')}>Dashboard</Button>
        <Button color="inherit" onClick={() => onNavigate('reports')}>Reports</Button>
        <Button color="inherit" onClick={() => onNavigate('maps')}>Live Map</Button>
        <Button color="inherit" onClick={() => onNavigate('performance')}>Performance</Button>
        <Button color="inherit" onClick={() => onNavigate('data-entry')}>Data Entry</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
