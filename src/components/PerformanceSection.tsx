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
    labels: ['فعال', 'غیرفعال'],
    datasets: [{
      data: [uptime, 100 - uptime],
      backgroundColor: ['#4CAF50', '#E0E0E0'],
      borderWidth: 0,
      cutout: '70%',
    }],
  };

  const radarData = {
    labels: ['سرعت', 'مصرف', 'توقف', 'مسافت', 'ایمنی'],
    datasets: [{
      label: 'عملکرد متوسط',
      data: [75, 82, 60, 88, 90],
      backgroundColor: 'rgba(25, 118, 210, 0.2)',
      borderColor: '#1976d2',
      pointBackgroundColor: '#1976d2',
    }],
  };

  return (
    <Box className="space-y-8">
      <Typography variant="h4" className="text-center font-bold text-gray-800 mb-8">
        تحلیل عملکرد ناوگان
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
        <Box sx={{ flex: '1 1 350px', maxWidth: '500px' }}>
          <Card className="h-full shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="text-center">
              <Typography variant="h6" gutterBottom>میزان فعالیت</Typography>
              <Box sx={{ height: 300 }}>
                <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
              </Box>
              <Typography variant="h5" className="mt-4 font-bold text-green-600">{uptime}%</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 350px', maxWidth: '500px' }}>
          <Card className="h-full shadow-lg hover:shadow-xl transition-shadow">
            <CardContent>
              <Typography variant="h6" gutterBottom>شاخص‌های کلیدی</Typography>
              <Box sx={{ height: 300 }}>
                <Radar data={radarData} options={{ responsive: true, maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', mt: 6 }}>
        {[
          { label: 'میانگین سرعت', value: `${avgSpeed} km/h`, color: 'bg-blue-500' },
          { label: 'مصرف سوخت', value: `${fuelEfficiency} L/100km`, color: 'bg-amber-500' },
          { label: 'کل مسافت', value: `${vehicles.reduce((a, b) => a + b.distance, 0)} km`, color: 'bg-green-500' },
        ].map((item, i) => (
          <Box key={i} sx={{ flex: '1 1 200px', maxWidth: '300px' }}>
            <Card className="text-center p-4 bg-gradient-to-br from-white to-gray-50 shadow-md">
              <Typography variant="body2" color="textSecondary">{item.label}</Typography>
              <Typography variant="h5" className={`font-bold mt-2 ${item.color} text-white px-3 py-1 rounded-full inline-block`}>
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