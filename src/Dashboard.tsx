import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
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
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import GaugeChart from 'react-gauge-chart';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  driver_name: string;
  driver_phone: string;
  updated_at: string;
}

interface VehicleHistory {
  id: number;
  vehicle_id: number;
  lat: number;
  lng: number;
  timestamp: string;
}

const BACKEND_URL = 'https://animated-fishstick-7jqqj4xxpvxcrq66-3010.app.github.dev';

const Dashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPath, setSelectedPath] = useState<LatLngExpression[]>([]);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/vehicles`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
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

  const fetchHistory = async (id: number) => {
    try {
      const response = await fetch(`${BACKEND_URL}/vehicles/${id}/history`);
      if (!response.ok) throw new Error('Failed to fetch history');
      const data = await response.json();
      setSelectedPath(data.map((h: VehicleHistory) => [h.lat, h.lng] as LatLngExpression));
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  const center: LatLngExpression = [52.5215, 13.4070];
  const activeVehiclesCount = vehicles.filter(v => v.status === 'moving').length;
  const totalVehicles = vehicles.length;
  const totalDistanceValue = vehicles.reduce((a, b) => a + b.distance, 0);
  const filteredVehicles = vehicles.filter(v =>
    (filterStatus === 'all' || v.status === filterStatus) &&
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h3" align="center" gutterBottom color="primary">
          Fleet Management Dashboard
        </Typography>

        {/* Filter and Search */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as string)}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="moving">Moving</MenuItem>
              <MenuItem value="stopped">Stopped</MenuItem>
              <MenuItem value="idle">Idle</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Search Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flex: 1 }}
          />
        </Box>

        {/* KPI Cards with Gauges */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
          <Card sx={{ flex: 1, minWidth: 250 }}>
            <CardContent>
              <Typography color="textSecondary">Active Vehicles</Typography>
              <GaugeChart id="gauge-active" nrOfLevels={3} percent={activeVehiclesCount / totalVehicles} />
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, minWidth: 250 }}>
            <CardContent>
              <Typography color="textSecondary">Total Distance</Typography>
              <GaugeChart id="gauge-distance" nrOfLevels={3} percent={totalDistanceValue / 10000} />
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, minWidth: 250 }}>
            <CardContent>
              <Typography color="textSecondary">Total Vehicles</Typography>
              <GaugeChart id="gauge-total" nrOfLevels={3} percent={totalVehicles / 50} />
            </CardContent>
          </Card>
        </Box>

        {/* Map */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Live Map</Typography>
            <MapContainer
              center={center}
              zoom={13}
              style={{ height: 400, width: '100%' }}
              ref={mapRef}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filteredVehicles.map(v => (
                <Marker
                  key={v.id}
                  position={[v.lat, v.lng] as LatLngExpression}
                  eventHandlers={{ mouseover: () => fetchHistory(v.id) }}
                >
                  <Popup>
                    <Typography variant="body2">
                      {v.name}<br />
                      Driver: {v.driver_name}<br />
                      Status: {v.status}<br />
                      Last Update: {new Date(v.updated_at).toLocaleString()}
                    </Typography>
                  </Popup>
                </Marker>
              ))}
              {selectedPath.length > 1 && <Polyline positions={selectedPath} color="blue" />}
              {selectedPath.length > 0 && (
                <Marker position={selectedPath[0]}>
                  <Popup>A</Popup>
                </Marker>
              )}
              {selectedPath.length > 0 && (
                <Marker position={selectedPath[selectedPath.length - 1]}>
                  <Popup>B</Popup>
                </Marker>
              )}
            </MapContainer>
          </CardContent>
        </Card>

        {/* Vehicle Table */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>Vehicle List</Typography>
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
                  {filteredVehicles.map(v => (
                    <TableRow
                      key={v.id}
                      onMouseEnter={() => fetchHistory(v.id)}
                      sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
                    >
                      <TableCell>{v.id}</TableCell>
                      <TableCell>{v.name}</TableCell>
                      <TableCell><Chip label={v.status || 'Unknown'} size="small" /></TableCell>
                      <TableCell>{v.distance} km</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Dashboard;