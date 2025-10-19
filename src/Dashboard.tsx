import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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
import io from 'socket.io-client';

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
  const location = useLocation();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPath, setSelectedPath] = useState<LatLngExpression[]>([]);
  const mapRef = useRef<any>(null);
  const socket = useRef(io(`${BACKEND_URL}`, { transports: ['websocket'] }));

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

    const socketInstance = socket.current; // کپی ثابت
    socketInstance.on('vehicleData', (data: any) => {
      setVehicles(prevVehicles =>
        prevVehicles.map(v =>
          v.id === data.id ? { ...v, lat: data.lat, lng: data.lng, updated_at: data.updated_at } : v
        )
      );
    });

    return () => {
      socketInstance.disconnect(); // استفاده از متغیر ثابت
    };
  }, [location]);

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
        <CircularProgress size={60} color="primary" />
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
        <Typography variant="h3" align="center" gutterBottom>
          Fleet Management Dashboard
        </Typography>

        {/* Filter and Search */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 120, mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as string)}
              sx={{ borderRadius: 12 }}
            >
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
            sx={{ flex: 1, mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 12 } }}
          />
        </Box>

        {/* KPI Cards with Gauges */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
          <Card sx={{ flex: 1, minWidth: 250 }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography color="textSecondary" gutterBottom>
                Active Vehicles
              </Typography>
              <GaugeChart
                id="gauge-active"
                nrOfLevels={3}
                percent={activeVehiclesCount / totalVehicles}
                colors={['#BBDEFB', '#90CAF9', '#64B5F6']}
              />
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, minWidth: 250 }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography color="textSecondary" gutterBottom>
                Total Distance
              </Typography>
              <GaugeChart
                id="gauge-distance"
                nrOfLevels={3}
                percent={totalDistanceValue / 10000}
                colors={['#BBDEFB', '#90CAF9', '#64B5F6']}
              />
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, minWidth: 250 }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography color="textSecondary" gutterBottom>
                Total Vehicles
              </Typography>
              <GaugeChart
                id="gauge-total"
                nrOfLevels={3}
                percent={totalVehicles / 50}
                colors={['#BBDEFB', '#90CAF9', '#64B5F6']}
              />
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
              style={{ height: 400, width: '100%', borderRadius: 16, overflow: 'hidden' }}
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
              {selectedPath.length > 1 && <Polyline positions={selectedPath} color="#FF4081" />}
              {selectedPath.length > 0 && (
                <Marker position={selectedPath[selectedPath.length - 1]}>
                  <Popup>B</Popup>
                </Marker>
              )}
              {selectedPath.length > 0 && (
                <Marker position={selectedPath[0]}>
                  <Popup>A</Popup>
                </Marker>
              )}
            </MapContainer>
          </CardContent>
        </Card>

        {/* Vehicle Table */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Vehicle List
            </Typography>
            <TableContainer sx={{ borderRadius: 16 }}>
              <Table sx={{ minWidth: 650 }} aria-label="vehicle table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#90CAF9' }}>
                    <TableCell sx={{ color: '#FFFFFF' }}>ID</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }}>Name</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }}>Status</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }}>Distance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredVehicles.map(v => (
                    <TableRow
                      key={v.id}
                      onMouseEnter={() => fetchHistory(v.id)}
                      sx={{ '&:hover': { backgroundColor: 'rgba(144, 202, 249, 0.3)' } }}
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