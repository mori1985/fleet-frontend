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
    labels: ['Moving', 'Stopped', 'Idle'],
    datasets: [{
      data: [statusCount.moving, statusCount.stopped, statusCount.idle],
      backgroundColor: ['#10B981', '#EF4444', '#F59E0B'],
      borderWidth: 3,
      borderColor: '#fff',
    }],
  };

  const barData = {
    labels: vehicles.map(v => v.name),
    datasets: [{
      label: 'Distance (km)',
      data: vehicles.map(v => v.distance),
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderRadius: 8,
    }],
  };

  const lineData = {
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Total Distance (km)',
      data: [1200, 1350, 1100, 1500, 1600, 1400, 1300],
      borderColor: '#8B5CF6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      tension: 0.4,
      fill: true,
    }],
  };

  return (
    <Box className="space-y-8">
      <Typography variant="h4" className="text-center font-bold text-indigo-800 mb-8">
        Analytics Reports
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
        <Box sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <Card className="h-full shadow-lg hover:shadow-xl transition-shadow border-t-4 border-t-green-500">
            <CardContent>
              <Typography variant="h6" gutterBottom className="text-gray-700">Vehicle Status</Typography>
              <Box sx={{ height: 280 }}>
                <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <Card className="h-full shadow-lg hover:shadow-xl transition-shadow border-t-4 border-t-blue-500">
            <CardContent>
              <Typography variant="h6" gutterBottom className="text-gray-700">Distance Traveled</Typography>
              <Box sx={{ height: 280 }}>
                <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <Card className="h-full shadow-lg hover:shadow-xl transition-shadow border-t-4 border-t-purple-500">
            <CardContent>
              <Typography variant="h6" gutterBottom className="text-gray-700">Weekly Trend</Typography>
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