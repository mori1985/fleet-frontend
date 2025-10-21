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
      backgroundColor: ['#10B981', '#E5E7EB'],
      borderWidth: 0,
      cutout: '70%',
    }],
  };

  const radarData = {
    labels: ['Speed', 'Fuel', 'Stops', 'Distance', 'Safety'],
    datasets: [{
      label: 'Average Performance',
      data: [75, 82, 60, 88, 90],
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: '#3B82F6',
      pointBackgroundColor: '#3B82F6',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#3B82F6',
    }],
  };

  return (
    <Box className="space-y-8">
      <Typography 
        variant="h4" 
        className="text-center font-bold mb-8"
        sx={{ 
          background: 'linear-gradient(to right, #7C3AED, #EC4899)', 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 700
        }}
      >
        Fleet Performance Analysis
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
        <Box sx={{ flex: '1 1 350px', maxWidth: '500px' }}>
          <Card className="h-full shadow-lg hover:shadow-xl transition-shadow border-t-4 border-t-green-500">
            <CardContent className="text-center">
              <Typography variant="h6" gutterBottom className="text-gray-700 font-medium">
                Activity Rate
              </Typography>
              <Box sx={{ height: 300 }}>
                <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
              </Box>
              <Typography variant="h5" className="mt-4 font-bold text-green-600">
                {uptime}%
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 350px', maxWidth: '500px' }}>
          <Card className="h-full shadow-lg hover:shadow-xl transition-shadow border-t-4 border-t-purple-500">
            <CardContent>
              <Typography variant="h6" gutterBottom className="text-gray-700 font-medium">
                Key Metrics
              </Typography>
              <Box sx={{ height: 300 }}>
                <Radar data={radarData} options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  scales: {
                    r: {
                      angleLines: { color: 'rgba(0,0,0,0.1)' },
                      grid: { color: 'rgba(0,0,0,0.1)' },
                      pointLabels: { font: { size: 12 } },
                      ticks: { backdropColor: 'transparent' }
                    }
                  }
                }} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', mt: 6 }}>
        {[
          { label: 'Average Speed', value: `${avgSpeed} km/h`, color: 'bg-blue-600' },
          { label: 'Fuel Efficiency', value: `${fuelEfficiency} L/100km`, color: 'bg-amber-600' },
          { label: 'Total Distance', value: `${vehicles.reduce((a, b) => a + b.distance, 0).toLocaleString()} km`, color: 'bg-green-600' },
        ].map((item, i) => (
          <Box key={i} sx={{ flex: '1 1 200px', maxWidth: '300px' }}>
            <Card className="text-center p-4 bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-lg transition-shadow">
              <Typography variant="body2" color="textSecondary" className="font-medium">
                {item.label}
              </Typography>
              <Typography variant="h5" className={`font-bold mt-2 ${item.color} text-white px-4 py-2 rounded-full inline-block shadow-md`}>
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