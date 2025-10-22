import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // زیر 900px

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, section: 'dashboard' },
    { label: 'Live Map', icon: <MapIcon />, section: 'map' },
    { label: 'Vehicles', icon: <TableIcon />, section: 'data-entry' },
    { label: 'Reports', icon: <ReportIcon />, section: 'reports' },
    { label: 'Performance', icon: <SpeedIcon />, section: 'performance' },
  ];

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
      <Toolbar sx={{ 
        justifyContent: 'space-between', 
        py: { xs: 1, md: 1.5 },
        minHeight: { xs: 56, md: 64 }
      }}>
        {/* عنوان سمت چپ - در موبایل مخفی */}
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 800,
            background: 'linear-gradient(to right, #60A5FA, #A78BFA, #EC4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '1px',
            fontFamily: '"Poppins", sans-serif',
            display: { xs: 'none', md: 'block' },
            fontSize: { xs: '1.1rem', md: '1.5rem' }
          }}
        >
          FLEET DASHBOARD MANAGER
        </Typography>

        {/* منوها - ریسپانسیو */}
        <Box sx={{ 
          display: 'flex', 
          gap: { xs: 0.5, sm: 1, md: 1.5 }, 
          ml: 'auto',
          flexDirection: { xs: 'column', md: 'row' },
          width: { xs: '100%', md: 'auto' },
          alignItems: { xs: 'center', md: 'flex-end' },
          justifyContent: { xs: 'center', md: 'flex-end' }
        }}>
          {menuItems.map((item) => (
            <Button
              key={item.section}
              onClick={() => onNavigate(item.section)}
              startIcon={item.icon}
              sx={{
                color: '#e0e0e0',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.95rem' },
                px: { xs: 1.5, sm: 2, md: 2.5 },
                py: { xs: 0.8, md: 1 },
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                width: { xs: '85%', sm: 'auto' },
                maxWidth: { xs: 200, sm: 'none' },
                '&:hover': {
                  background: 'rgba(59, 130, 246, 0.2)',
                  color: '#ffffff',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 28px rgba(59, 130, 246, 0.3)',
                  borderColor: '#60A5FA',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                },
              }}
            >
              {isMobile ? item.label.split(' ')[0] : item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;