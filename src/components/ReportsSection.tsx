import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material'; // اصلاح شد
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
    labels: ['Moving', 'Stopped', 'Idle'],
    datasets: [{
      data: [statusCount.moving, statusCount.stopped, statusCount.idle],
      backgroundColor: ['#7C3AED', '#A78BFA', '#EC4899'],
      borderWidth: 3,
      borderColor: '#1a1a2e',
    }],
  };

  const barData = {
    labels: vehicles.map(v => v.name),
    datasets: [{
      label: 'Distance (km)',
      data: vehicles.map(v => v.distance),
      backgroundColor: '#A78BFA',
      borderRadius: 8,
    }],
  };

  const lineData = {
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Total Distance (km)',
      data: [1200, 1350, 1100, 1500, 1600, 1400, 1300],
      borderColor: '#EC4899',
      backgroundColor: 'rgba(236, 72, 153, 0.1)',
      tension: 0.4,
      fill: true,
    }],
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Typography 
        variant="h4" 
        className="text-center font-bold mb-10"
        sx={{ 
          background: 'linear-gradient(to right, #7C3AED, #A78BFA, #EC4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 800,
          fontFamily: '"Poppins", sans-serif',
        }}
      >
        Analytics Reports
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
        {[
          { title: 'Vehicle Status', chart: <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#C4B5FD' } } } }} />, border: '#7C3AED' },
          { title: 'Distance Traveled', chart: <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { color: '#C4B5FD' } }, x: { ticks: { color: '#C4B5FD' } } } }} />, border: '#A78BFA' },
          { title: 'Weekly Trend', chart: <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { ticks: { color: '#C4B5FD' } }, x: { ticks: { color: '#C4B5FD' } } } }} />, border: '#EC4899' },
        ].map((item, i) => (
          <Box key={i} sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <Card sx={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              border: `1px solid rgba(167, 139, 250, 0.2)`,
              boxShadow: '0 8px 32px rgba(124, 58, 237, 0.2)',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 16px 40px rgba(124, 58, 237, 0.35)' },
              borderTop: `4px solid ${item.border}`
            }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#A78BFA', fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Box sx={{ height: 280 }}>
                  {item.chart}
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ReportsSection;