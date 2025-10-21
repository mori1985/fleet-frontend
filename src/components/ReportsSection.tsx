import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from 'chart.js';
import { Vehicle } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

interface ReportsSectionProps {
  vehicles: Vehicle[];
}

const ReportsSection: React.FC<ReportsSectionProps> = ({ vehicles }) => {
  const statusCount = {
    moving: vehicles.filter(v => v.status === 'moving').length,
    stopped: vehicles.filter(v => v.status === 'stopped').length,
    idle: vehicles.filter(v => v.status === 'idle').length,
  };

  const pieData = {
    labels: ['در حال حرکت', 'متوقف', 'بی‌کار'],
    datasets: [{
      data: [statusCount.moving, statusCount.stopped, statusCount.idle],
      backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
      borderWidth: 2,
      borderColor: '#fff',
    }],
  };

  const barData = {
    labels: vehicles.map(v => v.name),
    datasets: [{
      label: 'مسافت (کیلومتر)',
      data: vehicles.map(v => v.distance),
      backgroundColor: 'rgba(25, 118, 210, 0.7 stave)',
      borderRadius: 8,
    }],
  };

  const lineData = {
    labels: ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
    datasets: [{
      label: 'مسافت کل (کیلومتر)',
      data: [1200, 1350, 1100, 1500, 1600, 1400, 1300],
      borderColor: '#1976d2',
      backgroundColor: 'rgba(25, 118, 210, 0.1)',
      tension: 0.4,
      fill: true,
    }],
  };

  return (
    <Box className="space-y-8">
      <Typography variant="h4" className="text-center font-bold text-gray-800 mb-8">
        گزارش‌های تحلیلی
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
        <Box sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <Card className="h-full shadow-lg hover:shadow-xl transition-shadow">
            <CardContent>
              <Typography variant="h6" gutterBottom>وضعیت خودروها</Typography>
              <Box sx={{ height: 280 }}>
                <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <Card className="h-full shadow-lg hover:shadow-xl transition-shadow">
            <CardContent>
              <Typography variant="h6" gutterBottom>مسافت طی‌شده</Typography>
              <Box sx={{ height: 280 }}>
                <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <Card className="h-full shadow-lg hover:shadow-xl transition-shadow">
            <CardContent>
              <Typography variant="h6" gutterBottom>روند هفتگی</Typography>
              <Box sx={{ height: 280 }}>
                <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default ReportsSection;