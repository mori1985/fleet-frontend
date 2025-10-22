import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { Vehicle } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale, PointElement, LineElement);

interface PerformanceSectionProps {
  vehicles: Vehicle[];
}

const PerformanceSection: React.FC<PerformanceSectionProps> = ({ vehicles }) => {
  const avgSpeed = 65;
  const fuelEfficiency = 7.8;
  const uptime = 94;

  const doughnutData = {
    labels: ['Active', 'Inactive'],
    datasets: [{
      data: [uptime, 100 - uptime],
      backgroundColor: ['#7C3AED', '#4C1D95'],
      borderWidth: 0,
      cutout: '70%',
    }],
  };

  const radarData = {
    labels: ['Speed', 'Fuel', 'Stops', 'Distance', 'Safety'],
    datasets: [{
      label: 'Average Performance',
      data: [75, 82, 60, 88, 90],
      backgroundColor: 'rgba(167, 139, 250, 0.15)',
      borderColor: '#A78BFA',
      pointBackgroundColor: '#A78BFA',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#A78BFA',
    }],
  };

  return (
    <Box sx={{ mb: 6 }}>
      {/* عنوان اصلی */}
      <Typography 
        variant="h4" 
        className="text-center font-bold mb-10"
        sx={{ 
          background: 'linear-gradient(to right, #7C3AED, #A78BFA, #EC4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 800,
          fontFamily: '"Poppins", sans-serif',
          letterSpacing: '0.5px',
        }}
      >
        Fleet Performance Analysis
      </Typography>

      {/* چارت‌ها */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
        {/* Activity Rate */}
        <Box sx={{ flex: '1 1 350px', maxWidth: '500px' }}>
          <Card sx={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            border: '1px solid rgba(167, 139, 250, 0.2)',
            boxShadow: '0 8px 32px rgba(124, 58, 237, 0.2)',
            borderRadius: 3,
            transition: 'all 0.3s ease',
            '&:hover': { 
              transform: 'translateY(-4px)', 
              boxShadow: '0 16px 40px rgba(124, 58, 237, 0.35)' 
            },
            borderTop: '4px solid #7C3AED'
          }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#A78BFA', fontWeight: 600 }}>
                Activity Rate
              </Typography>
              <Box sx={{ height: 300 }}>
                <Doughnut data={doughnutData} options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { labels: { color: '#C4B5FD' } }
                  }
                }} />
              </Box>
              <Typography variant="h5" sx={{ mt: 2, fontWeight: 700, color: '#C4B5FD' }}>
                {uptime}%
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Key Metrics */}
        <Box sx={{ flex: '1 1 350px', maxWidth: '500px' }}>
          <Card sx={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            border: '1px solid rgba(167, 139, 250, 0.2)',
            boxShadow: '0 8px 32px rgba(124, 58, 237, 0.2)',
            borderRadius: 3,
            transition: 'all 0.3s ease',
            '&:hover': { 
              transform: 'translateY(-4px)', 
              boxShadow: '0 16px 40px rgba(124, 58, 237, 0.35)' 
            },
            borderTop: '4px solid #A78BFA'
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#A78BFA', fontWeight: 600 }}>
                Key Metrics
              </Typography>
              <Box sx={{ height: 300 }}>
                <Radar data={radarData} options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  scales: {
                    r: {
                      angleLines: { color: 'rgba(167, 139, 250, 0.2)' },
                      grid: { color: 'rgba(167, 139, 250, 0.1)' },
                      pointLabels: { color: '#C4B5FD' },
                      ticks: { color: '#A78BFA', backdropColor: 'transparent' }
                    }
                  },
                  plugins: {
                    legend: { labels: { color: '#C4B5FD' } }
                  }
                }} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* کارت‌های کوچک */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', mt: 6 }}>
        {[
          { label: 'Average Speed', value: `${avgSpeed} km/h`, bg: '#7C3AED' },
          { label: 'Fuel Efficiency', value: `${fuelEfficiency} L/100km`, bg: '#A78BFA' },
          { label: 'Total Distance', value: `${vehicles.reduce((a, b) => a + b.distance, 0).toLocaleString()} km`, bg: '#EC4899' },
        ].map((item, i) => (
          <Box key={i} sx={{ flex: '1 1 200px', maxWidth: '300px' }}>
            <Card sx={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              border: '1px solid rgba(167, 139, 250, 0.2)',
              boxShadow: '0 8px 32px rgba(124, 58, 237, 0.2)',
              borderRadius: 3,
              textAlign: 'center',
              p: 3,
              transition: 'all 0.3s ease',
              '&:hover': { 
                transform: 'translateY(-4px)', 
                boxShadow: '0 16px 40px rgba(124, 58, 237, 0.35)' 
              }
            }}>
              <Typography variant="body2" sx={{ color: '#A78BFA', fontWeight: 500 }}>
                {item.label}
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 700, 
                  mt: 1.5, 
                  bgcolor: item.bg, 
                  color: 'white', 
                  px: 3, 
                  py: 1.5, 
                  borderRadius: 3, 
                  display: 'inline-block',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                {item.value}
              </Typography>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PerformanceSection;