// KPISection.tsx
import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import GaugeChart from 'react-gauge-chart';

interface KPISectionProps {
  activeVehiclesCount: number;
  totalVehicles: number;
  totalDistanceValue: number;
}

const KPISection: React.FC<KPISectionProps> = ({ activeVehiclesCount, totalVehicles, totalDistanceValue }) => (
  <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
    <Card sx={{ flex: 1, minWidth: 250 }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography color="textSecondary" gutterBottom>
          Active Vehicles
        </Typography>
        <GaugeChart
          id="active-vehicles"
          nrOfLevels={3}
          percent={activeVehiclesCount / totalVehicles}
          colors={['#BBDEFB', '#64B5F6', '#1976d2']}
        />
      </CardContent>
    </Card>
    <Card sx={{ flex: 1, minWidth: 250 }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography color="textSecondary" gutterBottom>
          Total Distance (km)
        </Typography>
        <GaugeChart
          id="total-distance"
          nrOfLevels={3}
          percent={totalDistanceValue / 10000}
          colors={['#FFECB3', '#FFC107', '#FF9800']}
        />
      </CardContent>
    </Card>
    <Card sx={{ flex: 1, minWidth: 250 }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography color="textSecondary" gutterBottom>
          Total Vehicles
        </Typography>
        <GaugeChart
          id="total-vehicles"
          nrOfLevels={3}
          percent={totalVehicles / 50}
          colors={['#C8E6C9', '#4CAF50', '#087f23']}
        />
      </CardContent>
    </Card>
  </Box>
);

export default KPISection;
