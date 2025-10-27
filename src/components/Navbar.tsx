import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  useMediaQuery, 
  useTheme, 
  IconButton, 
  Menu, 
  MenuItem 
} from '@mui/material';
import { 
  Map as MapIcon, 
  Assessment as ReportIcon, 
  Dashboard as DashboardIcon, 
  TableChart as TableIcon, 
  Speed as SpeedIcon,
  Menu as MenuIcon 
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

  // State برای کنترل منو همبرگری
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
        py: { xs: 0.5, md: 1.5 }, // کاهش padding تو موبایل
        minHeight: { xs: 48, md: 64 } // ارتفاع کمتر تو موبایل
      }}>
        {/* عنوان - ریسپانسیو با فونت کوچکتر تو موبایل */}
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 800,
            background: 'linear-gradient(to right, #60A5FA, #A78BFA, #EC4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '1px',
            fontFamily: '"Poppins", sans-serif',
            fontSize: { xs: '0.9rem', md: '1.5rem' }, // فونت کوچکتر تو موبایل
            display: 'block', // همیشه نمایش داده بشه
          }}
        >
        DEMO FLEET DASHBOARD MANAGER
        </Typography>

        {/* منو همبرگری تو موبایل */}
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              sx={{ 
                color: '#e0e0e0',
                '&:hover': { color: '#60A5FA' },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  background: 'rgba(26, 26, 26, 0.9)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.section}
                  onClick={() => {
                    onNavigate(item.section);
                    handleMenuClose();
                  }}
                  sx={{
                    color: '#e0e0e0',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    '&:hover': { background: 'rgba(59, 130, 246, 0.2)', color: '#ffffff' },
                    '& .MuiSvgIcon-root': { fontSize: '1.1rem', marginRight: 1 },
                  }}
                >
                  {item.icon}
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          // منو افقی تو دسکتاپ
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 0.5, sm: 1, md: 1.5 }, 
            ml: 'auto',
            alignItems: 'center',
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
                {item.label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;