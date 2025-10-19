import { createTheme } from '@mui/material/styles';

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2196F3', // آبی روشن و زنده (مشابه نوبار)
      },
      secondary: {
        main: '#FF4081', // صورتی جذاب و پرانرژی
      },
      background: {
        default: '#80aaf8ff', // پس‌زمینه بسیار روشن آبی
        paper: '#73bbf7ff', // بک‌گراند کارت‌ها: آبی روشن ملایم (هماهنگ با نوبار)
      },
      text: {
        primary: '#1A237E', // متن تیره آبی برای کنتراست
        secondary: '#424242', // خاکستری تیره برای جزئیات
      },
      success: {
        main: '#4CAF50', // سبز ملایم برای تأیید
      },
      warning: {
        main: '#FF9800', // نارنجی گرم برای هشدار
      },
    },
    typography: {
      h3: {
        fontWeight: 700,
        color: '#1A237E',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)', // سایه ملایم برای جذابیت
      },
      h5: {
        fontWeight: 600,
        color: '#424242',
      },
      body2: {
        color: '#424242',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 6px 20px rgba(33, 150, 243, 0.2)', // سایه آبی ملایم
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.03)',
              boxShadow: '0 10px 25px rgba(33, 150, 243, 0.3)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 10,
            backgroundColor: '#FF4081',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#F50057', // صورتی تیره‌تر تو hover
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: '#E1BEE7', // بنفش روشن برای چیپ‌ها
            color: '#4A148C',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              '& fieldset': {
                borderColor: '#90CAF9', // آبی ملایم برای حاشیه
              },
              '&:hover fieldset': {
                borderColor: '#64B5F6',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#2196F3',
              },
            },
          },
        },
      },
    },
  });

  export default theme;