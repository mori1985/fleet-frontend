import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import GaugeChart from 'react-gauge-chart';

interface KPISectionProps {
  activeVehiclesCount: number;
  totalVehicles: number;
  totalDistanceValue: number;
}

const KPISection: React.FC<KPISectionProps> = ({ activeVehiclesCount, totalVehicles, totalDistanceValue }) => {
  // رنگ‌های بنفش برای تم
  const purpleGradient = 'linear-gradient(to right, #7C3AED, #A78BFA, #EC4899)';
  const cardBg = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
  const titleColor = '#A78BFA';
  const valueColor = '#C4B5FD';

  return (
    <Box sx={{ mb: 6 }}>
      {/* عنوان اصلی - بنفش گرادیان */}
      <Typography 
        variant="h4" 
        className="text-center font-bold mb-10"
        sx={{ 
          background: purpleGradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 800,
          letterSpacing: '1px',
          fontFamily: '"Poppins", sans-serif',
        }}
      >
        Fleet Performance Analysis
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Active Vehicles */}
        <Card 
          sx={{ 
            flex: 1, 
            minWidth: 250, 
            background: cardBg,
            border: '1px solid rgba(167, 139, 250, 0.2)',
            boxShadow: '0 8px 32px rgba(124, 58, 237, 0.2)',
            borderRadius: 3,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 16px 40px rgba(124, 58, 237, 0.35)',
            }
          }}
        >
          <CardContent sx={{ textAlign: 'center', pb: 2 }}>
            <Typography 
              gutterBottom 
              className="font-semibold"
              sx={{ 
                color: titleColor,
                fontSize: '1.1rem',
                fontWeight: 600,
              }}
            >
              Active Vehicles
            </Typography>
            <Box sx={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height: '100%' }}>
                <GaugeChart
                  id="active-vehicles"
                  nrOfLevels={3}
                  percent={totalVehicles > 0 ? activeVehiclesCount / totalVehicles : 0}
                  colors={['#4C1D95', '#7C3AED', '#A78BFA']}
                />
              </div>
            </Box>
            <Typography 
              variant="h5" 
              className="mt-2 font-bold"
              sx={{ color: valueColor }}
            >
              {activeVehiclesCount} / {totalVehicles}
            </Typography>
          </CardContent>
        </Card>

        {/* Total Distance */}
        <Card 
          sx={{ 
            flex: 1, 
            minWidth: 250, 
            background: cardBg,
            border: '1px solid rgba(167, 139, 250, 0.2)',
            boxShadow: '0 8px 32px rgba(124, 58, 237, 0.2)',
            borderRadius: 3,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 16px 40px rgba(124, 58, 237, 0.35)',
            }
          }}
        >
          <CardContent sx={{ textAlign: 'center', pb: 2 }}>
            <Typography 
              gutterBottom 
              className="font-semibold"
              sx={{ 
                color: titleColor,
                fontSize: '1.1rem',
                fontWeight: 600,
              }}
            >
              Total Distance (km)
            </Typography>
            <Box sx={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height: '100%' }}>
                <GaugeChart
                  id="total-distance"
                  nrOfLevels={3}
                  percent={totalDistanceValue > 0 ? Math.min(totalDistanceValue / 10000, 1) : 0}
                  colors={['#4C1D95', '#7C3AED', '#A78BFA']}
                />
              </div>
            </Box>
            <Typography 
              variant="h5" 
              className="mt-2 font-bold"
              sx={{ color: valueColor }}
            >
              {totalDistanceValue.toLocaleString()} km
            </Typography>
          </CardContent>
        </Card>

        {/* Total Vehicles */}
        <Card 
          sx={{ 
            flex: 1, 
            minWidth: 250, 
            background: cardBg,
            border: '1px solid rgba(167, 139, 250, 0.2)',
            boxShadow: '0 8px 32px rgba(124, 58, 237, 0.2)',
            borderRadius: 3,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 16px 40px rgba(124, 58, 237, 0.35)',
            }
          }}
        >
          <CardContent sx={{ textAlign: 'center', pb: 2 }}>
            <Typography 
              gutterBottom 
              className="font-semibold"
              sx={{ 
                color: titleColor,
                fontSize: '1.1rem',
                fontWeight: 600,
              }}
            >
              Total Vehicles
            </Typography>
            <Box sx={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height: '100%' }}>
                <GaugeChart
                  id="total-vehicles"
                  nrOfLevels={3}
                  percent={totalVehicles > 0 ? Math.min(totalVehicles / 50, 1) : 0}
                  colors={['#4C1D95', '#7C3AED', '#A78BFA']}
                />
              </div>
            </Box>
            <Typography 
              variant="h5" 
              className="mt-2 font-bold"
              sx={{ color: valueColor }}
            >
              {totalVehicles}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default KPISection;