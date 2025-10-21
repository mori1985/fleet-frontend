// theme.ts
import { createTheme } from '@mui/material/styles';

// این تم برای داشبورد Fleet طراحی شده و رنگ‌ها، کارت‌ها، دکمه‌ها و جدول‌ها هماهنگ هستند
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },      // آبی تیره و مدرن
    secondary: { main: '#ff4081' },    // صورتی جذاب برای button ها
    background: { default: '#f5f7fa', paper: '#ffffff' }, // پس‌زمینه روشن و کارت سفید
    text: { primary: '#1a1a1a', secondary: '#555555' },
    success: { main: '#4caf50' },
    warning: { main: '#ff9800' },
    error: { main: '#f44336' },
  },
  typography: {
    h5: { fontWeight: 600 },
    body1: { fontSize: 14 },
    body2: { fontSize: 13, color: '#555555' },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          transition: '0.3s',
          '&:hover': { opacity: 0.9 },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
  },
});

export default theme;
