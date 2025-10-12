import React, { useEffect, useState, useRef } from 'react';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
// import { LocationOn, DirectionsCar, Speed } from '@mui/icons-material';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
// import io from 'socket.io-client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DirectionsCar } from '@mui/icons-material';
// تو KPI card:
<DirectionsCar sx={{ fontSize: 60, color: 'info.main', mr: 2 }} />

// Fix Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Vehicle {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status?: string;
  distance: number;
}

const BACKEND_URL = 'https://animated-fishstick-7jqqj4xxpvxcrq66-3010.app.github.dev';

const Dashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/vehicles`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        setVehicles(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const center: LatLngExpression = [35.6892, 51.389];

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography sx={{ mt: 2 }}>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom color="primary">
        Fleet Management Dashboard
      </Typography>

      {/* KPI Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <Card sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <Typography color="textSecondary">Active Vehicles</Typography>
            <Typography variant="h4">
              {vehicles.filter(v => v.status === 'moving').length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <Typography color="textSecondary">Total Distance</Typography>
            <Typography variant="h4">
              {vehicles.reduce((a, b) => a + b.distance, 0).toFixed(1)} km
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <Typography color="textSecondary">Total Vehicles</Typography>
            <Typography variant="h4">{vehicles.length}</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Map */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Live Map
          </Typography>
          <MapContainer
            center={center}
            zoom={13}
            style={{ height: 400, width: '100%' }}
            ref={mapRef}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {vehicles.map(v => (
              <Marker key={v.id} position={[v.lat, v.lng] as LatLngExpression} />
            ))}
          </MapContainer>
        </CardContent>
      </Card>

      {/* Vehicle Table */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Vehicle List
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Distance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicles.map(v => (
                  <TableRow key={v.id}>
                    <TableCell>{v.id}</TableCell>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>
                      <Chip 
                        label={v.status || 'Unknown'} 
                         size="small"
                      />
                    </TableCell>
                    <TableCell>{v.distance} km</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Dashboard;