import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { 
  Map as MapIcon, 
  Assessment as ReportIcon, 
  Dashboard as DashboardIcon, 
  TableChart as TableIcon, 
  Speed as SpeedIcon 
} from '@mui/icons-material';

interface NavbarProps {
  onNavigate: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'rgba(26, 26, 26, 0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        zIndex: 1300,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1.5 }}>
        {/* عنوان سمت چپ */}
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 800,
            background: 'linear-gradient(to right, #60A5FA, #A78BFA, #EC4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '1px',
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          FLEET DASHBOARD MANAGER
        </Typography>

        {/* منوهای شیشه‌ای سمت راست */}
        <Box sx={{ display: 'flex', gap: 1.5, ml: 'auto' }}>
          {[
            { label: 'Dashboard', icon: <DashboardIcon />, section: 'dashboard' },
            { label: 'Reports', icon: <ReportIcon />, section: 'reports' },
            { label: 'Live Map', icon: <MapIcon />, section: 'map' },
            { label: 'Vehicles', icon: <TableIcon />, section: 'data-entry' },
            { label: 'Performance', icon: <SpeedIcon />, section: 'performance' },
          ].map((item) => (
            <Button
              key={item.section}
              onClick={() => onNavigate(item.section)}
              startIcon={item.icon}
              sx={{
                color: '#e0e0e0',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                px: 2.5,
                py: 1,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'rgba(59, 130, 246, 0.2)',
                  color: '#ffffff',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 28px rgba(59, 130, 246, 0.3)',
                  borderColor: '#60A5FA',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '1.3rem',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;