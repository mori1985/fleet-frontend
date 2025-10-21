import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import GaugeChart from 'react-gauge-chart';

interface KPISectionProps {
  activeVehiclesCount: number;
  totalVehicles: number;
  totalDistanceValue: number;
}

const KPISection: React.FC<KPISectionProps> = ({ activeVehiclesCount, totalVehicles, totalDistanceValue }) => (
  <Box sx={{ mb: 6 }}>
    {/* عنوان Vehicle List */}
    <Typography 
      variant="h4" 
      className="text-center font-bold mb-8"
      sx={{ 
        background: 'linear-gradient(to right, #1E40AF, #3B82F6)', 
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 700
      }}
    >
      Vehicle List
    </Typography>

    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
      {/* Active Vehicles */}
      <Card 
        sx={{ 
          flex: 1, 
          minWidth: 250, 
          background: 'linear-gradient(to bottom, #EFF6FF, #DBEAFE)',
          border: '1px solid #BFDBFE',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
          borderRadius: 3
        }}
      >
        <CardContent sx={{ textAlign: 'center', pb: 2 }}>
          <Typography color="textSecondary" gutterBottom className="font-medium">
            Active Vehicles
          </Typography>
          <Box sx={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '100%' }}>
              <GaugeChart
                id="active-vehicles"
                nrOfLevels={3}
                percent={totalVehicles > 0 ? activeVehiclesCount / totalVehicles : 0}
                colors={['#BFDBFE', '#60A5FA', '#2563EB']}
              />
            </div>
          </Box>
          <Typography variant="h5" className="mt-2 font-bold text-blue-700">
            {activeVehiclesCount} / {totalVehicles}
          </Typography>
        </CardContent>
      </Card>

      {/* Total Distance */}
      <Card 
        sx={{ 
          flex: 1, 
          minWidth: 250, 
          background: 'linear-gradient(to bottom, #EFF6FF, #DBEAFE)',
          border: '1px solid #BFDBFE',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
          borderRadius: 3
        }}
      >
        <CardContent sx={{ textAlign: 'center', pb: 2 }}>
          <Typography color="textSecondary" gutterBottom className="font-medium">
            Total Distance (km)
          </Typography>
          <Box sx={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '100%' }}>
              <GaugeChart
                id="total-distance"
                nrOfLevels={3}
                percent={totalDistanceValue > 0 ? Math.min(totalDistanceValue / 10000, 1) : 0}
                colors={['#BFDBFE', '#60A5FA', '#2563EB']}
              />
            </div>
          </Box>
          <Typography variant="h5" className="mt-2 font-bold text-blue-700">
            {totalDistanceValue.toLocaleString()} km
          </Typography>
        </CardContent>
      </Card>

      {/* Total Vehicles */}
      <Card 
        sx={{ 
          flex: 1, 
          minWidth: 250, 
          background: 'linear-gradient(to bottom, #EFF6FF, #DBEAFE)',
          border: '1px solid #BFDBFE',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
          borderRadius: 3
        }}
      >
        <CardContent sx={{ textAlign: 'center', pb: 2 }}>
          <Typography color="textSecondary" gutterBottom className="font-medium">
            Total Vehicles
          </Typography>
          <Box sx={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '100%' }}>
              <GaugeChart
                id="total-vehicles"
                nrOfLevels={3}
                percent={totalVehicles > 0 ? Math.min(totalVehicles / 50, 1) : 0}
                colors={['#BFDBFE', '#60A5FA', '#2563EB']}
              />
            </div>
          </Box>
          <Typography variant="h5" className="mt-2 font-bold text-blue-700">
            {totalVehicles}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default KPISection;